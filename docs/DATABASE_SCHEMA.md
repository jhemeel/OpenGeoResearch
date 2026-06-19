# DATABASE_SCHEMA.md

# OpenGeoResearch Database Schema

## Entity Relationship Diagram (ERD)

```text
User
 │
 ├── UserRole
 │       │
 │       ▼
 │      Role
 │
 ├── ProjectMember
 │       │
 │       ▼
 │     Project
 │         │
 │         ▼
 │      Survey
 │         │
 │  ┌──────┼─────────────┐
 │  ▼      ▼             ▼
 │ Section Question RepeatingGroup
 │           │
 │           ▼
 │     QuestionOption
 │
 │           ▼
 │      LogicRule
 │
 ▼
Response
 │
 ├── Answer
 │
 ├── Location
 │
 ├── MediaFile
 │
 └── GroupInstance
         │
         ▼
     GroupAnswer

Project
 │
 ├── BoundaryLayer
 │         │
 │         ▼
 │    BoundaryFeature
 │
 ├── Insight
 │         │
 │         ▼
 │    InsightSource
 │
 └── AuditLog
```

---

# Base Model

All models inherit from:

```python
class BaseModel(models.Model):
    id = models.UUIDField(
        primary_key=True,
        editable=False
    )

    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        abstract = True
```

---

# Accounts

## User

```python
class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
```

Indexes:

```text
email
```

---

## Role

```python
class Role(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField()
```

Values:

```text
Administrator
Principal Investigator
Research Assistant
Data Analyst
```

---

## UserRole

```python
class UserRole(BaseModel):
    user = models.ForeignKey(User)
    role = models.ForeignKey(Role)
```

---

# Projects

## Project

```python
class Project(BaseModel):
    title = models.CharField(max_length=255)

    description = models.TextField()

    principal_investigator = models.ForeignKey(
        User,
        on_delete=models.PROTECT
    )

    start_date = models.DateField()

    end_date = models.DateField(
        null=True,
        blank=True
    )

    status = models.CharField(max_length=50)
```

Status:

```text
draft
active
completed
archived
```

---

## ProjectMember

```python
class ProjectMember(BaseModel):
    project = models.ForeignKey(Project)

    user = models.ForeignKey(User)

    role = models.CharField(max_length=50)
```

---

# Surveys

## Survey

```python
class Survey(BaseModel):
    project = models.ForeignKey(Project)

    title = models.CharField(max_length=255)

    description = models.TextField()

    version = models.PositiveIntegerField()

    is_published = models.BooleanField(
        default=False
    )

    parent_version = models.ForeignKey(
        "self",
        null=True,
        blank=True
    )
```

Constraint:

```text
Survey versions are immutable after publication.
```

---

## SurveySection

```python
class SurveySection(BaseModel):
    survey = models.ForeignKey(Survey)

    title = models.CharField(max_length=255)

    order_index = models.IntegerField()
```

---

## Question

```python
class Question(BaseModel):
    survey = models.ForeignKey(Survey)

    section = models.ForeignKey(
        SurveySection
    )

    question_text = models.TextField()

    question_type = models.CharField(
        max_length=50
    )

    required = models.BooleanField(
        default=False
    )

    order_index = models.IntegerField()
```

Question Types:

```text
short_text
long_text
integer
decimal
date
time
single_choice
multiple_choice
likert
gps
image
```

---

## QuestionOption

```python
class QuestionOption(BaseModel):
    question = models.ForeignKey(
        Question
    )

    label = models.CharField(
        max_length=255
    )

    value = models.CharField(
        max_length=255
    )

    order_index = models.IntegerField()
```

---

# Skip Logic

## LogicRule

```python
class LogicRule(BaseModel):

    survey = models.ForeignKey(
        Survey
    )

    source_question = models.ForeignKey(
        Question,
        related_name="source_rules"
    )

    operator = models.CharField(
        max_length=50
    )

    comparison_value = models.JSONField()

    action = models.CharField(
        max_length=50
    )

    target_question = models.ForeignKey(
        Question,
        null=True,
        blank=True
    )

    target_section = models.ForeignKey(
        SurveySection,
        null=True,
        blank=True
    )
```

Operators:

```text
equals
not_equals
greater_than
less_than
contains
is_empty
is_not_empty
```

Actions:

```text
show_question
hide_question
jump_to_question
show_section
hide_section
skip_section
```

---

# Repeating Groups

## RepeatingGroup

```python
class RepeatingGroup(BaseModel):

    survey = models.ForeignKey(
        Survey
    )

    title = models.CharField(
        max_length=255
    )

    min_repeats = models.IntegerField()

    max_repeats = models.IntegerField()
```

---

## RepeatingGroupQuestion

```python
class RepeatingGroupQuestion(
    BaseModel
):
    group = models.ForeignKey(
        RepeatingGroup
    )

    question = models.ForeignKey(
        Question
    )
```

---

# Responses

## Response

```python
class Response(BaseModel):

    survey = models.ForeignKey(
        Survey
    )

    status = models.CharField(
        max_length=50
    )

    submitted_at = models.DateTimeField(
        null=True
    )
```

Status:

```text
draft
submitted
reviewed
```

---

## Answer

```python
class Answer(BaseModel):

    response = models.ForeignKey(
        Response
    )

    question = models.ForeignKey(
        Question
    )

    value = models.JSONField()
```

---

# Repeating Group Responses

## GroupInstance

```python
class GroupInstance(BaseModel):

    response = models.ForeignKey(
        Response
    )

    group = models.ForeignKey(
        RepeatingGroup
    )

    sequence_number = models.IntegerField()
```

---

## GroupAnswer

```python
class GroupAnswer(BaseModel):

    instance = models.ForeignKey(
        GroupInstance
    )

    question = models.ForeignKey(
        Question
    )

    value = models.JSONField()
```

---

# GIS Models

## Location

```python
from django.contrib.gis.db import models

class Location(BaseModel):

    response = models.OneToOneField(
        Response
    )

    point = models.PointField(
        geography=True,
        srid=4326
    )

    accuracy_meters = models.FloatField(
        null=True
    )
```

Spatial Index:

```text
GiST(point)
```

---

## BoundaryLayer

```python
class BoundaryLayer(BaseModel):

    project = models.ForeignKey(
        Project
    )

    name = models.CharField(
        max_length=255
    )

    geometry_type = models.CharField(
        max_length=50
    )
```

---

## BoundaryFeature

```python
class BoundaryFeature(BaseModel):

    layer = models.ForeignKey(
        BoundaryLayer
    )

    feature_name = models.CharField(
        max_length=255
    )

    properties = models.JSONField()

    geometry = models.GeometryField()
```

---

# Media

## MediaFile

```python
class MediaFile(BaseModel):

    response = models.ForeignKey(
        Response
    )

    file = models.FileField()

    mime_type = models.CharField(
        max_length=100
    )
```

---

# AI Insights

## Insight

```python
class Insight(BaseModel):

    project = models.ForeignKey(
        Project
    )

    insight_type = models.CharField(
        max_length=100
    )

    title = models.CharField(
        max_length=255
    )

    summary = models.TextField()
```

---

## InsightSource

```python
class InsightSource(BaseModel):

    insight = models.ForeignKey(
        Insight
    )

    source_type = models.CharField(
        max_length=100
    )

    source_reference = models.UUIDField()
```

---

# Audit Logging

## AuditLog

```python
class AuditLog(BaseModel):

    user = models.ForeignKey(
        User
    )

    entity_type = models.CharField(
        max_length=100
    )

    entity_id = models.UUIDField()

    action = models.CharField(
        max_length=100
    )

    previous_data = models.JSONField(
        null=True
    )

    new_data = models.JSONField(
        null=True
    )
```

---

# Required Database Extensions

```sql
CREATE EXTENSION postgis;
CREATE EXTENSION pgcrypto;
CREATE EXTENSION "uuid-ossp";
```

---

# Required Indexes

```text
users(email)

projects(status)

surveys(project_id)

questions(survey_id)

responses(survey_id)

answers(response_id)

locations(point) USING GIST

boundary_features(geometry) USING GIST

audit_logs(user_id)

insights(project_id)
```

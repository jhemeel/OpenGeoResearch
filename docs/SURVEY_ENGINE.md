# Survey Engine Architecture

## Overview

The Survey Engine is the core runtime system of OpenGeoResearch.

It transforms survey definitions into interactive questionnaires that can:

- Collect responses
- Evaluate logic
- Navigate dynamically
- Capture GPS
- Save drafts
- Validate responses

The survey engine must remain:

- Deterministic
- Reproducible
- Version aware
- Extensible

---

# Core Principle

A published survey is immutable.

Responses are always linked to a specific survey version.

Example:

Survey v1
├── 1,000 responses

Survey v2
├── 200 responses

Responses must never be migrated automatically.

---

# Survey Runtime Flow

```text
Load Survey
      │
      ▼

Initialize Runtime State

      │
      ▼

Display Question

      │
      ▼

Collect Answer

      │
      ▼

Validate Answer

      │
      ▼

Evaluate Logic Rules

      │
      ▼

Determine Next Question

      │
      ▼

Continue Until Complete
```

---

# Runtime Components

## Survey Loader

Purpose:

Load a survey version from the database.

Output:

```json
{
  "survey": {},
  "sections": [],
  "questions": [],
  "logic_rules": []
}
```

---

## Runtime State

Stores:

```json
{
  "current_question": "...",
  "answers": {},
  "visible_questions": [],
  "completed_sections": []
}
```

Runtime state exists only during survey execution.

---

# Question Lifecycle

Every question follows:

```text
Load
Display
Validate
Save
Evaluate Logic
Move Forward
```

---

# Question Types

Supported Types:

- Short Text
- Long Text
- Integer
- Decimal
- Date
- Time
- Single Choice
- Multiple Choice
- Likert Scale
- GPS
- Image Upload

Future:

- Audio
- Video
- Barcode
- Signature

---

# Validation Engine

## Required Validation

Example:

```text
Age is required.
```

---

## Numeric Validation

Example:

```text
Age must be between 18 and 65.
```

---

## Pattern Validation

Example:

```text
Phone number format.
```

Regex supported.

---

# Skip Logic Engine

## Purpose

Control survey flow dynamically.

Example:

Question:

Are you pregnant?

Answer:

Yes

Action:

Show pregnancy section.

---

# Logic Evaluation Order

Rules are processed:

```text
Top to Bottom
```

Order matters.

---

# Supported Operators

equals

not_equals

greater_than

less_than

contains

is_empty

is_not_empty

---

# Supported Actions

show_question

hide_question

show_section

hide_section

skip_section

jump_to_question

end_survey

---

# Example Logic

```text
IF Gender = Female

THEN Show Pregnancy Section
```

---

# Repeating Groups

Purpose:

Capture multiple instances of similar data.

Examples:

- Household Members
- Children
- Facilities
- Pregnancies

---

# Example

Household Members

Member 1

Member 2

Member 3

Each member stores:

```json
{
  "name": "",
  "age": "",
  "sex": ""
}
```

---

# Repeating Group Runtime

```text
Create Instance

Fill Questions

Save Answers

Repeat Until Finished
```

---

# Draft Saving

Drafts should save automatically.

Events:

- Page change
- Question completion
- Manual save

---

# Autosave Interval

Default:

```text
30 seconds
```

Configurable.

---

# GPS Runtime

## Capture Sources

Browser Geolocation API

Manual Entry

Map Selection

---

# GPS Validation

Store:

```json
{
  "latitude": 7.3775,
  "longitude": 3.9470,
  "accuracy": 8
}
```

---

# Media Runtime

Supported:

- Images

Future:

- Audio
- Video
- Documents

---

# Navigation Engine

Modes:

## Question-by-Question

```text
Q1

Next

Q2
```

---

## Section-by-Section

```text
Section A

Next Section

Section B
```

---

# Progress Tracking

Formula:

```text
Answered Visible Questions
÷
Total Visible Questions
```

Example:

```text
15 / 20 = 75%
```

---

# Survey Completion

Requirements:

- Required questions answered
- Validation passed
- Logic processed

---

# Submission Process

```text
Validate

Save

Lock Response

Generate Audit Event
```

---

# Versioning Rules

Published surveys:

```text
Read Only
```

Changes require:

```text
New Version
```

---

# Audit Events

Log:

- Draft Saved
- Question Answered
- Logic Triggered
- Survey Submitted

---

# Offline Support (Version 2)

Capabilities:

- Local storage
- Offline completion
- Sync when online

---

# Performance Goals

Target:

- 1,000 question surveys
- < 100ms logic evaluation
- < 500ms page transitions

---

# Future Enhancements

Version 2:

- Offline engine
- Survey translations
- Multi-language support

Version 3:

- Adaptive surveys
- AI-assisted survey design
- AI-generated validation suggestions

---

# Survey Engine Philosophy

The survey engine should behave consistently regardless of:

- Device
- Browser
- Survey size
- Geographic location

Every respondent should experience the exact same logic flow for a given survey version.
# 🐍 Python Language Fluency Training Guide Task(For Agent Use)

## 🎯 Purpose

This guide is designed to build **mechanical fluency in Python**, not problem-solving ability.

Goal:

> Make writing Python feel automatic and intuitive through repetition of core patterns.

---

# 🧠 Core Python Concepts

## 1. 🧱 Data Types (Foundation)

### Primitive Types

* `int`
* `float`
* `bool`
* `str`

### Collection Types (HIGH PRIORITY)

* `list` → ordered, mutable
* `tuple` → ordered, immutable
* `set` → unordered, unique
* `dict` → key-value mapping

---

## 2. 🔁 Control Flow

### Conditionals

* `if / elif / else`

### Loops

* `for`
* `for + enumerate`
* `while`

---

## 3. 🧩 Functions

* Function definition (`def`)
* Parameters vs arguments
* Return values
* Default arguments
* Multiple return values

---

## 4. ⚡ Expressions vs Statements

* Expression → produces a value
* Statement → performs an action

---

## 5. 🧠 Comprehensions

* List comprehensions
* Conditional comprehensions
* Dict comprehensions

---

## 6. 🔧 Built-in Functions

* `map()`
* `filter()`
* `sum()`
* `min()` / `max()`
* `sorted()`
* `any()` / `all()`
* `zip()`

---

## 7. 🧬 Mutability & References

### Mutable

* list
* dict
* set

### Immutable

* int
* str
* tuple

Key Concept:

* Variables store references, not copies

---

## 8. 🧪 Iterables & Iteration

* Anything usable in a `for` loop
* `iter()` and `next()` basics

---

## 9. 🧵 Strings

* Common methods: `lower()`, `upper()`, `split()`, `strip()`
* f-strings

---

## 10. 📦 Modules & Imports

* `import`
* `from x import y`

Common modules:

* `math`
* `collections`
* `itertools`

---

## 11. 🧱 Classes (Basic OOP)

* `class`
* `__init__`
* instance variables
* methods

---

## 12. ⚠️ Error Handling

* `try / except`

---

## 13. 🧹 Common Patterns

* Frequency counting
* Grouping
* Transformations

---

# 🧭 Priority System

## 🔴 Tier 1 (MUST MASTER)

* lists / dicts / sets
* loops (`for`, `enumerate`)
* functions
* conditionals
* string manipulation

## 🟠 Tier 2 (VERY IMPORTANT)

* comprehensions
* built-in functions
* mutability & references

## 🟡 Tier 3 (SECONDARY)

* classes
* modules
* error handling
* common patterns

---

# 🤖 Agent Instructions

## State Management

The agent maintains progress in `memory/python-fluency-state.json`.

**On every drill session (whether triggered by heartbeat or user prompt):**
1. Read `memory/python-fluency-state.json` before generating questions
2. Check `questionsAsked` — do not repeat a question that appears there verbatim
3. After generating, append a short 1-line summary of each new question to `questionsAsked`
   - Keep a max of 50 entries. If over limit, remove the oldest ones first.
4. **Output destination:**
   - **Heartbeat-generated (daily):** write to `dynamic_output/python_fluency/daily_exercises/YYYY-MM-DD.py` (one `.py` file per day — NOT markdown)
   - **User-prompted drills:** append to the appropriate topic `.py` file in `dynamic_output/python_fluency_drills/` (match topic to filename, use `.py` extension)
5. Increment `topicProgress[topic].sessionsCompleted`
6. Update `lastSessionDate` to today's date (YYYY-MM-DD)
7. Update `sessionCount` + 1
8. Write the updated state back to `memory/python-fluency-state.json`

**Topic Progression Logic:**
- Stay on `currentTopic` until `sessionsCompleted >= 3`, then the agent may proactively suggest moving on
- User can always override by naming a topic explicitly (e.g., "give me loops drills")
- User can mark mastery: "mark loops as mastered" → set `masteryScore: 5` for that topic in state file
- Topics with `masteryScore >= 4` are skipped in daily heartbeat rotation but still available on direct request
- Tier 2 topics only unlock once all Tier 1 topics have `sessionsCompleted >= 2`
- Tier 3 topics only unlock once all Tier 2 topics have `sessionsCompleted >= 2`

---

## Rol For this task

For this task you are a **Python Fluency Training Agent**.

Your job is to:

* Build repetition
* Reinforce muscle(well cognitive) memory
* Avoid complex problem-solving questions
* Focus on **direct coding drills**

---

## Behavior Rules

1. DO NOT give LeetCode-style problems
2. DO NOT require deep algorithmic thinking
3. FOCUS on repetition and pattern recognition
4. KEEP tasks short and targeted
5. ENCOURAGE multiple solutions to the same problem
6. INCREASE difficulty gradually

---

## Interaction Protocol

### Step 1: User Prompt

The user will specify a section or tier, e.g.:

* "Tier 1"
* "Comprehensions"
* "Mutability"

---

### Step 2: Agent Response

Return **No more than 10 targeted drill questions** that:

* Focus ONLY on that section
* Require writing Python code
* Emphasize repetition of patterns

A subsequent question will encourage a different approach or be a repeat of the prior question with slight variation. Then add some complexity built on the previous one in complexity. Repetition is important, so don't be afraid to ask similar questions with slight variations one after another before building complexity.
---

---

## Example Question Types

### Lists

* Iterate through a list and print values
* Filter values greater than X
* Reverse a list

### Dicts

* Count frequency of elements
* Merge two dictionaries

### Loops

* Use `enumerate`
* Nested loops (simple)

### Comprehensions

* Convert loop → comprehension
* Add condition filtering

---

## Response Format

Always respond like:

```
Section: <name>

1. Question...
2. Question...
3. Question...
...
```
 ## Output Format — Python Files Only

Output is always a `.py` file, never markdown.

Each drill question must be written as runnable Python with:
1. A comment header for the question (e.g. `# Q1: Filter numbers greater than 5`)
2. All required data structures **pre-built and ready** — do not make the user type out sample data
3. A `pass` placeholder (or empty function body) where the user writes their solution
4. An optional `# Expected output:` comment so they can verify

Example format:
```python
# Q1: Filter all numbers greater than 5 from the list using a loop
numbers = [2, 7, 1, 9, 4, 6, 3, 8]
result = []
# Your solution here:


# Expected output: [7, 9, 6, 8]


# Q2: Do the same using a list comprehension
numbers = [2, 7, 1, 9, 4, 6, 3, 8]
result = None  # replace with your comprehension
# Expected output: [7, 9, 6, 8]
```

For dict/set questions, pre-build the dict or set. For function questions, write the `def` signature with `pass`. For class questions, write the class skeleton. The user should only need to fill in the logic.

Append each question set to the appropriate `.py` file under `dynamic_output/python_fluency_drills/` based on topic. If there is confusion about where to put it, ask for clarification.
---

## Optional Follow-Up Mode

If the user requests:

* "check answers"
* "show solutions"

Then:

* Provide clean, idiomatic Python solutions
* Show BOTH loop-based and Pythonic versions when possible

---

# 🚀 End Goal

The user should reach a point where tasks like:

* Writing loops is automatic
* Using dicts feels natural
* Manipulating strings is intuitive
* Comprehensions are intuitive
* Built-ins are preferred over manual loops


> Fluency first → then return to LeetCode for problem-solving

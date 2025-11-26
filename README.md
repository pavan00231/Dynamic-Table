Project Title – Data Table With Filters, Sorting & Selection

A fully interactive data table built with React + Redux Toolkit, featuring:

    1. Search (debounced)
    2. Filtering (multi-select dropdown)
    3. Sorting
    4. Row selection (select/unselect all)
    5. Virtual test data support
    6. Full test coverage with Vitest + React Testing Library

Live Demo

👉 Live Project:https://dynamic-table001-git-main-pavans-projects-db0e1877.vercel.app/


Tech Stack

Frontend

    React 18+

    Redux Toolkit

    JavaScript (ES6+)

Testing

    Vitest

    React Testing Library

    jsdom

Deployment

    Vercel



Running Tests

    Run all tests

        npm run test

    Test with coverage

        npm run test:coverage


Coverage report will be generated at:

/coverage/index.html


Open it in the browser to view full HTML report.




Features Explained

1. Debounced Search

Search triggers only after 300 ms, reducing re-rendering.

    1. 📍 Multi-select Filters

    2. Location filter

    3. Health status filter

    4. Dropdown opens on hover

    5. Fully test-covered

↕ Sorting

    Sorts by Power column (ASC/DESC toggle).

Row Selection

    Click to select/unselect
    1. Select All
    2. Unselect All

Uses Redux to track selected IDs.

Testing Summary

    1. UI tests
    2. Interaction tests
    3. Checkbox behavior tests
    4. Mouse hover tests
    5. Slice reducer logic tests
    6. Select/unselect all logic
    7. Debounce behavior
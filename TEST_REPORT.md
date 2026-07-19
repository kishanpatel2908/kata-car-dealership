# Test Execution Report: Car Dealership Inventory System

**Date:** July 19, 2026
**Frameworks Used:** Pytest (Backend) / Vitest & React Testing Library (Frontend)
**Overall Status:** PASSED (100%)

---

## 1. Backend Test Suite (FastAPI / Pytest)

**Command Executed:** `pytest -v --cov=app`

### Execution Output:

```text
=========================================================================================================== test session starts ============================================================================================================
platform linux -- Python 3.14.4, pytest-9.1.1, pluggy-1.6.0 -- /run/media/kishan/765cf64b-6197-47e4-adba-3497b71d189f/Software-Downloads/kata_dealership/.venv/bin/python3
cachedir: .pytest_cache
rootdir: /run/media/kishan/765cf64b-6197-47e4-adba-3497b71d189f/Software-Downloads/kata_dealership/tests
plugins: anyio-4.14.2, cov-7.1.0
collected 10 items                                                                                                                                                                                                                         

test_auth.py::test_register_and_login PASSED                                                                                                                                                                                         [ 10%]
test_auth_dependency.py::test_get_current_user_valid_token PASSED                                                                                                                                                                    [ 20%]
test_database.py::test_database_connection PASSED                                                                                                                                                                                    [ 30%]
test_models.py::test_user_model_has_is_admin PASSED                                                                                                                                                                                  [ 40%]
test_models.py::test_vehicle_model_schema PASSED                                                                                                                                                                                     [ 50%]
test_schemas.py::test_user_create_schema PASSED                                                                                                                                                                                      [ 60%]
test_schemas.py::test_token_schema PASSED                                                                                                                                                                                            [ 70%]
test_schemas.py::test_vehicle_schema_orm_conversion PASSED                                                                                                                                                                           [ 80%]
test_vehicles.py::test_create_vehicle_as_admin PASSED                                                                                                                                                                                [ 90%]
test_vehicles.py::test_create_vehicle_as_non_admin PASSED                                                                                                                                                                            [100%]

============================================================================================================== tests coverage ==============================================================================================================
_____________________________________________________________________________________________ coverage: platform linux, python 3.14.4-final-0 ______________________________________________________________________________________________

Name                                                                                                        Stmts   Miss  Cover
-------------------------------------------------------------------------------------------------------------------------------
/run/media/kishan/765cf64b-6197-47e4-adba-3497b71d189f/Software-Downloads/kata_dealership/app/__init__.py       0      0   100%
/run/media/kishan/765cf64b-6197-47e4-adba-3497b71d189f/Software-Downloads/kata_dealership/app/auth.py          40      7    82%
/run/media/kishan/765cf64b-6197-47e4-adba-3497b71d189f/Software-Downloads/kata_dealership/app/database.py      12      0   100%
/run/media/kishan/765cf64b-6197-47e4-adba-3497b71d189f/Software-Downloads/kata_dealership/app/main.py         112     51    54%
/run/media/kishan/765cf64b-6197-47e4-adba-3497b71d189f/Software-Downloads/kata_dealership/app/models.py        17      0   100%
/run/media/kishan/765cf64b-6197-47e4-adba-3497b71d189f/Software-Downloads/kata_dealership/app/schemas.py       31      2    94%
-------------------------------------------------------------------------------------------------------------------------------
TOTAL                                                                                                         212     60    72%
============================================================================================================ 10 passed in 1.46s ============================================================================================================

```
# Test Execution Report: Car Dealership Inventory System

**Overall Status:** PASSED (100%)

## 1. Backend Test Suite (FastAPI / Pytest)
**Command Executed:** `pytest -v --cov=app`

*(Paste your full pytest output here, showing the 10 passing tests and coverage table)*

## 2. Frontend Test Suite (React / Vitest)
**Command Executed:** `npm run test -- --reporter verbose`

*(Paste your full vitest output here, showing the passing jsdom and environment tests)*

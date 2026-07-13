# MediSync - PRD

### Objectives

The objective of this PRD is to clarify the requirements of the MediSync software, an AI-powered healthcare platform that aims to deliver real-time medical insights. The pratform provides AI-powered medical insights using modern web technologies.

### Glossary

- FR - Functional Requirement
- NFR - Non-Functional Requirement
- PRD - Product Requirements Document

### Requirements

- FR-01 - The system must analyze user-provided symptom using information retrieved from PubMed.
- FR-02 - The system must recommend the appropriate medical specialty through AI-based triage.
- FR-03 - The system must locate nearby hospitals and healthcare professionals using Google Maps.
- FR-04 - The system must provide a sumary of possible causes, treatment and preventive measures based on retrieved medical information.
- FR-05 - The system must automatically detect the user's location.
- FR-06 - The system must have a PubMed API integration to fetch research papers.
- FR-07 - The system must recommend specialized doctors automatically on the AI triage.
- FR-08 - The system must use semantic search to retrieve information from the Vector Database.

- NFR-01 - The system must have a simple, responsive and easy to navigate interface.
- NFR-02 - The system must respond to user requests within 5 seconds under normal operating conditions.
### Assumptions

This system assumes that:
- On its first version it'll not have authentication service.
- The PubMed API is available.
- The OpenAI Model (gpt-4o) is available.
- There will be no safeguards against extensive anonymous usage.
# NETWORK_INTELLIGENCE.md - Professional Network Mapping for Job Opportunities

**Important:** Only activate this mode when I explicitly say something like "Switch to network intelligence mode", "Research [Person]'s network", or "Run network intelligence on [Person]" alongside the link I provide. This is completely separate from your normal software engineering assistance, job search or contact research task. After completing the task and delivering the final output, immediately switch back to standard mode.

## Purpose
Help me identify high-leverage people in a target professional network to uncover hidden job opportunities, warm introductions, referral paths, and hiring influence. Focus on value for my software engineering career (Bay Area / remote roles).

This task is **research-only**. It is not for outreach automation.

## Input
I will provide:
- Target person (LinkedIn profile URL preferred, or name + current company/role)
- Any additional context (e.g., "Focus on engineering leadership", "Interested in AI/ML roles")

## Objective
- Analyze the target's career and professional network.
- Prioritize mapping their **first-degree connections** (people they are directly connected to on LinkedIn).
- Identify strong, relevant connections who could influence hiring or provide referrals.
- Surface company/role clusters that align with my skills and interests.

## Process (Agent Instructions)

### Step 1: Analyze the Target Person
- Navigate to the target's LinkedIn profile using the browser (Playwright + CDP with my logged-in session).
- Extract: current role, company, seniority, past experience, career trajectory, skills, and any hiring-related signals.
- Behave like a human: use natural scrolling, small random delays, and gradual navigation.

### Step 2: Expand to Connections (Focus on First-Degree)
- On the target's LinkedIn profile, **explicitly click on the "Connections" button/tab** (usually shows the number of connections, e.g., "500+ connections"). 
- This will display the list of the target's **first-degree connections**. Since I am connected to the target, these people will appear as my second-degree connections, making their profiles accessible.
- **Prioritize and start here**: Review the list of first-degree connections. If I mentioned how many connections to go through, only parse that amount.
  - Sample intelligently rather than loading everything at once (use filters if available, scroll gradually).
  - Focus on people who appear relevant: similar or adjacent roles, current/past company overlaps, engineering leadership, hiring managers, recruiters, or roles aligned with my background.
  - For promising individuals, click into their profiles to analyze their experience, current company, role, and any public activity or "Open to work" signals.
- Look for patterns:
  - People at the target's current company in relevant roles.
  - People from the target's past companies.
  - Shared connections or mutual interests.

**Second-degree connections (and beyond):**  
I believe it isn't possible to show a list of second-degree connections directly like with first. If you find out you can, use it, otherwise resort to other methods to identify second-degree connections:
- LinkedIn search for specific patterns (e.g., "[Role] at [Company]" or people who worked at the same past companies).
- Company alumni/search pages.
- Mutual connections visible on profiles.
- Public web searches and company career pages.

**Critical Rule – Research Only:**  
**Never** send connection requests, messages, InMail, likes, comments, or any form of interaction/outreach while in this mode. This task is strictly for gathering information and building a mental map. Any automation of outreach is prohibited here. You are using the throwaway Walter White LinkedIn account only as a method for research, not for any form of communication or engagement. Always maintain ethical standards and respect LinkedIn's terms of service.

### Step 3: Build a Mental Map
Organize the information internally (using markdown files, JSON structures, or in-memory notes as needed. whatever works for your capabilities):
- Group by company clusters, role clusters, and hiring influence.
- Note strength of connection to the target (worked together, long-term colleague, recent interaction, etc.).
- Highlight people who could serve as good outreach targets for me (hiring influence, referral potential, alignment with my skills).

### Step 4: Extract Actionable Opportunities

**Output Structure:**
After completing the research, create a comprehensive markdown file at the following path:

`dynamic_output/network_intelligence/[sanitized_original_person_name].md`
If i specified the first X connections, include that in the file name as well, e.g. `dynamic_output/network_intelligence/sarah_chen_top_50_connections.md`. Name it whatever best matches my input.

(Example: If the person is "Sarah Chen" and I asked for 200 connections to process, the file should be `dynamic_output/network_intelligence/sarah_chen_200_connections.md`. Sanitize the name by replacing spaces/special characters with underscores and using lowercase.) DO NOT SEND THIS OUTPUT TO MY TELEGRAM ACCOUNT. This file should be saved in the specified directory on your local system.

The file must contain the full analysis using this template structure:
**Target Summary**  
Brief overview of the person's role, career path, and why their network is relevant to me.

**Key Network Clusters**  
- 3–5 bullets highlighting notable patterns (company movements, role concentrations, hiring signals).

**Top 10–15 High-Value People for Outreach**  
Prioritize quality. For each person include:
- Full name + current title/company
- LinkedIn profile URL + email if publicly available (found via ethical web search only)
- Connection to the target (e.g., "Direct 1st-degree connection of the target", "Worked together at X for Y years")
- Why they are valuable to me (hiring manager, recruiter, recent move, role alignment, etc.)
- Any publicly available contact info (found via ethical web search only)
- Suggested outreach angle (if relevant)

**Recommended Next Steps (Input at the end of file)**
- Who to contact first, why, and potential things to say.
- Any promising company clusters for deeper research or applications.
- Limitations encountered (if LinkedIn restricted visibility).

Use clean, scannable markdown. Include links where helpful. Be transparent about data sources and any access limitations.

## Safety & Ethics Guardrails
- **Strictly research-only**: Never send messages, connection requests, or perform any outbound actions.
- Behave human-like in the browser: natural pacing, delays between actions, avoid rapid clicking or scrolling. Refer to the browser automation markdown for more information. 
- Respect LinkedIn limits and terms of service. If access is restricted, fall back to public information and search APIs.
- Do not store bulk personal data beyond what is needed for this single research task.

**After delivering the output**, end with:  
"Network intelligence task complete. Returning to standard assistance mode."

This mode ends once the output is provided.

\# DevRel Letter Generator - Claude Instructions



\## 🎯 Goal



Build a web service that generates:



1\. Markdown file based on `template\_markdown.md`

2\. Email HTML (as markdown file) based on `template\_email.md`



\---



\## 🚫 Critical Constraints (MUST FOLLOW)



\* NEVER modify:



&#x20; \* template\_markdown.md

&#x20; \* template\_email.md

\* Always create NEW files based on templates

\* Use placeholder replacement only (e.g., {{DATE}}, {{NEWS1\_TITLE}})

\* Do NOT change placeholder naming conventions



\---



\## 🧱 Architecture Guidelines



\* Use simple frontend (React or Vanilla JS)

\* Single large form UI

\* No backend required (client-side only is acceptable)

\* File generation should use Blob download



\---



\## 🧩 Core Features



\### 1. Form Structure



\* One large form with sections:



&#x20; \* DATE

&#x20; \* VOLUME

&#x20; \* NEWS (1\~2)

&#x20; \* Editor’s Pick (3\~5)

&#x20; \* AI4SE (1\~2)

&#x20; \* DevRel in DS (1\~5)

&#x20; \* DevRel in Korea (1\~5)



\---



\### 2. Buttons



\* Preview

\* Save as MD

\* Save as EMAIL Template



\---



\## ⚙️ Data Rules



\### DATE



\* Input format: YYYY.MM.DD

\* Replace {{DATE}}



\---



\### VOLUME



\* Input: number (0\~999)

\* Convert to 3-digit string (e.g., 18 → 018)

\* Replace {{VOLUME}}



\---



\### NEWS



\* Fields:



&#x20; \* title

&#x20; \* link

&#x20; \* thumbnail URL

&#x20; \* file upload



\#### MD Output:



\* Use thumbnail URL



\#### EMAIL Output:



\* Convert uploaded image → base64

\* Replace {{NEWS1\_THUMBNAIL\_IMAGE}}



\---



\### Editor’s Pick



\* Fields:



&#x20; \* title

&#x20; \* description (<br> allowed)

&#x20; \* link



\---



\### AI4SE



\* Fields:



&#x20; \* link

&#x20; \* description

&#x20; \* thumbnail URL

&#x20; \* file upload



\#### EMAIL Output:



\* Convert image to base64



\---



\### DevRel Sections



\* Simple list (title + link)



\---



\## 🔄 Template Processing Rules



\* Load template file as string

\* Replace placeholders using string.replace or similar

\* Support dynamic counts (NEWS1, NEWS2, etc.)

\* If unused slots exist → remove or leave empty safely



\---



\## 👀 Preview Behavior



\* Render EMAIL template as HTML

\* Allow user to edit before saving



\---



\## 🧪 Edge Cases



\* Missing optional sections

\* Only 1 item in multi-sections

\* Image upload missing (fallback to URL)



\---



\## 🧼 Code Style



\* Keep components modular

\* Separate:



&#x20; \* form state

&#x20; \* template processing

&#x20; \* file generation



\---



\## 🚀 Output Expectations



\* Clean UI

\* Stable placeholder replacement

\* No mutation of original templates




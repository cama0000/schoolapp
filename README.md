
# Study App

This project is a platform designed to help students manage their coursework and study effectively. This project aims to provide all the essential tools for academic success in one convenient place.

## Features

### Task Management
- **Create Tasks**: Organize your assignments and projects by creating tasks for each of your courses.
- **Set Deadlines**: Keep track of important due dates by setting deadlines for your tasks.
- **Mark as Complete**: Stay on top of your workload by checking off tasks as you complete them.

### Course Notebooks
- **Rich Text Notepad**: Take detailed and formatted notes with the rich text editor allowing for several styles of text.
- **Organized by Course**: Keep your notes organized with a separate notebook for each of your courses.

## Technologies
- **PostgreSQL Database** - For storing data related to user authentication and data related to coursework.
- **ReactJS Frontend** - Utilized React for a clean and simple user interface and to manage states.
- **Spring Boot Backend** - Utilized a RESTful API in order to manage tasks, courses and student information. Utilizes Spring Security for robust password encryption and API url protection.

## Run Locally

**Backend**
1. Clone the repository into a folder of your choosing. 
- Ex: `git clone https://github.com/cama0000/schoolapp.git`
2. Open the `schoolapp-api` folder in IntelliJ or a preffered text editor.
3. Set up credentials in `src/main/resources/application.yml` and set up Docker to run the database.
4. Run `schoolappApiApplication`. It is now running on port 8080.

**Frontend**
1. Open the `schoolapp-frontend` folder in VSCode or a preffered text editor.
2. Run `npm install` to install all dependencies.
3. Run `npm run dev`.
4. Visit `http://localhost:3000/`.

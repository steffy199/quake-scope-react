QuakeScope — Earthquake Dashboard

Overview:

QuakeScope is a React-based dashboard designed to visualize earthquake data sourced from the USGS Earthquake Feed. The application features:

Scatter Plot: A dynamic chart displaying earthquake magnitudes and depths.

Data Table: A scrollable table presenting detailed earthquake records.

To ensure optimal performance, especially when handling large datasets, the application employs lazy loading techniques for rendering the table content.

🚀 Features
Highlighting and Synchronization Between Chart and Table:  Selecting a point in the scatter plot or a row in the table highlights the corresponding data in both views, and the table scrolls to the selected row.

Lazy Loading for Table Rows: Uses chunked data rendering with infinite scroll to enhance performance when displaying thousands of records.

Responsive Layout: Adjusts the display to fit various screen sizes, ensuring usability across devices.

Data Fetching: Retrieves earthquake data from the USGS CSV feed.

Charting: Visualizes earthquake data using a scatter plot.

📦 Technologies and dependencies Used:

React: JavaScript library for building user interfaces.
PapaParse: CSV parsing library.
React Bootstrap: UI components for responsive design.
Bootstrap: Utility-first CSS framework for styling.
recharts: Charting library used to create the interactive scatter plot visualizing earthquake data.
zustand: Lightweight state management library used to share state (e.g., selected earthquake record) between components like the chart and table.

📱 Responsive Design
The application employs a responsive layout to ensure usability across various devices. The layout adjusts based on the screen size:

📥 Data Handling
The earthquake data is fetched from the USGS Earthquake Feed in CSV format. The application uses PapaParse to parse the CSV data and filter out records with missing or incomplete information.


🛠️ Setup and Installation

Clone the repository:
git clone https://github.com/steffy199/quake-scope-react.git

Navigate into the project directory:
cd quake-scope-react

Install dependencies:
npm install

Start the development server:
npm run dev

AI Tools in Development:
In the development of QuakeScope, GitHub Copilot was employed as an AI pair programmer to enhance productivity, improve code quality, and streamline the development process. Here's how Copilot was integrated:
1. Copilot provided real-time code suggestions, ranging from single lines to entire functions, based on the context of the code being written. This feature accelerated the development process by reducing manual coding efforts. 
2. Copilot assisted in identifying and rectifying bugs by suggesting appropriate code modifications through copilot chat.

# SIGMA
![image](https://github.com/imblackline/Sigma/assets/37950099/82500655-872c-416e-9571-03eda07a8e1c)

## Table of Contents
- [Introduction](#introduction)
- [Team](#team)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Data Preprocessing](#data-preprocessing)
- [Creating Visualizations](#creating-visualizations)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to the Data Visualization project repository! This project focuses on using modern web technologies to create interactive and insightful data visualizations. We leverage Vue 3 Composition API, Vite, and SCSS for front-end development, and D3.js for creating dynamic charts and plots. The data is preprocessed using Python and Pandas for data cleaning and preparation. This README provides an overview of the project, its technologies, and how to get started.

## Team

- Amirhossein Yaghoubnezhad
- Sheida Shahali
- Team Name: Sigma

## Technologies Used

### Vue 3 Composition API
Vue 3 Composition API is a powerful way to organize and manage the state and behavior of your application components. It provides more flexibility and reusability compared to Vue 2 Options API.

### Vite
Vite is a fast and flexible build tool for front-end development. It allows for blazing-fast development, hot module replacement, and is an ideal choice for Vue 3 projects.

### SCSS (Sass)
SCSS is a popular CSS preprocessor that offers features like variables, nesting, and mixins, making your CSS more maintainable and efficient.

### D3.js
D3.js is a widely-used JavaScript library for creating data visualizations in the browser. It provides a powerful set of tools for creating interactive charts, graphs, and other data-driven visual elements.

### Python and Pandas
Python, along with the Pandas library, is used for data preprocessing and cleaning. You can perform various data transformations and ensure that your data is ready for visualization.

## Project Structure

The project structure is organized as follows:

```
data-visualization-project/
  ├── src/
  |   ├── assets/
  |   ├── components/
  |   ├── styles/
  |   ├── App.vue
  |   ├── main.js
  ├── public/
  ├── .gitignore
  ├── package.json
  ├── README.md
  └── ...other project files
```

- `src/`: This folder contains the main application source code.
- `assets/`: Place any static assets like images or fonts here.
- `components/`: Vue components for building the application.
- `styles/`: SCSS files for styling the application.
- `App.vue`: The main Vue application file.
- `main.js`: Entry point of the application.
- `public/`: Static files that are not processed by Vite.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd data-visualization-project
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your web browser and go to `http://localhost:3000` to see the project in action.

## Data Preprocessing

Before using the data in your visualization, you may need to preprocess and clean it. Python, along with the Pandas library, is a powerful choice for data preprocessing. You can perform tasks such as data cleaning, transformation, and data structure adjustments to ensure that your data is ready for visualization.

## Creating Visualizations

You can create interactive data visualizations by adding D3.js code to your Vue components. Use D3.js to bind data to the DOM, create charts, and add interactivity to your visualizations. The project structure makes it easy to organize your components and styles for a clean and maintainable codebase.

## Demo

You can find a live demo of the Data Visualization project [here](https://imblackline.github.io/Sigma/#/). The demo showcases various data visualizations created using the technologies mentioned above.

## Contributing

Contributions to this project are welcome! If you want to improve or expand the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

We hope you find this project and its technologies helpful for your data visualization needs. If you have any questions or need assistance, please don't hesitate to reach out to us. Enjoy visualizing your data with Vue 3 Composition API, Vite, SCSS, D3.js, Python, and Pandas!

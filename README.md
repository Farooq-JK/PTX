# 🏭 Protronix Quote Generator

<div align="center">

![Protronix Logo](quotes/static/images/protronix_logo.png)

[![Django](https://img.shields.io/badge/Django-5.1.6-green.svg)](https://www.djangoproject.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

*A professional web application for generating and managing quotes, built with Django and modern web technologies.*

[Features](#-features) •
[Installation](#-installation) •
[Usage](#-usage) •
[Contributing](#-contributing) •
[License](#-license)

</div>

---

## ✨ Features

<div align="center">
<img src="quotes/static/images/protronix_logo.png" width="600px" />
</div>

### 📝 Multi-Page Quote Creation
- 📋 Item Details Entry
- 🔢 Assembly Quantity Configuration
- 💰 Cost Calculations for 1x and 15x Quantities
- 🏢 Supplier Information Management
- 💭 Additional Comments Section

### 🧮 Advanced Cost Calculations
- 🔄 Automatic Unit Cost Calculations
- 📊 Material Overhead Computations
- 📦 MOQ (Minimum Order Quantity) Handling
- 🛡️ Warranty Cost Integration
- 💵 Total Cost Summaries

### 📊 Quote Management
- 💾 Save and Store Quotes
- ✏️ Edit Existing Quotes
- 🗑️ Delete Quotes
- 📥 Download Quotes as PDF

### 📄 Professional PDF Generation
- 🎨 Company Branding
- 📊 Detailed Cost Breakdowns
- 📐 Professional Layout
- 📑 Multi-Page Organization

## 🛠️ Technology Stack

<div align="center">

[![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.1.6-green?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

</div>

- 📊 **PDF Generation**: jsPDF
- 🎨 **Styling**: Custom CSS with responsive design
- 🎯 **Icons**: Font Awesome
- 💾 **Storage**: Local Storage for quote data

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/protronix-quote-generator.git
   cd protronix-quote-generator
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   <details>
   <summary>Windows</summary>

   ```bash
   venv\Scripts\activate
   ```
   </details>

   <details>
   <summary>Unix/MacOS</summary>

   ```bash
   source venv/bin/activate
   ```
   </details>

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

7. **Visit [`http://127.0.0.1:8000`](http://127.0.0.1:8000) in your web browser**

## 📖 Usage

### 1. Creating a New Quote
<details>
<summary>Click to expand</summary>

- 📝 Click "Create New Quote"
- 📋 Fill in item details
- 🔢 Set assembly quantities
- 💰 Add costs and supplier information
- 💭 Add any additional comments
- ✅ Click "Finish" to save
</details>

### 2. Managing Quotes
<details>
<summary>Click to expand</summary>

- 📂 View all quotes in the "Stored Quotes" section
- 📥 Download quotes as PDFs
- ✏️ Edit existing quotes
- 🗑️ Delete unwanted quotes
</details>

### 3. PDF Generation
<details>
<summary>Click to expand</summary>

- 📥 Click "Download" on any quote
- 📄 PDF includes all quote details
- 🎨 Professional formatting with company branding
</details>

## 📁 Project Structure

```bash
quote_generator/
├── 📁 quotes/                 # Main application directory
│   ├── 📁 static/            # Static files
│   │   ├── 📁 css/          # Stylesheets
│   │   ├── 📁 js/           # JavaScript files
│   │   └── 📁 images/       # Images and icons
│   ├── 📁 templates/        # HTML templates
│   │   └── 📁 quotes/      # Quote-related templates
│   ├── 📄 views.py         # View functions
│   ├── 📄 urls.py          # URL configurations
│   └── 📄 models.py        # Data models
├── 📄 manage.py            # Django management script
└── 📄 requirements.txt     # Project dependencies
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request


## 👏 Acknowledgments

- 👨‍💻 Created by Aistidh
- 🏢 Special thanks to Protronix UK for the inspiration
- ❤️ Built with love and attention to detail


---

<div align="center">

Made with ❤️ by [Aistidh](https://github.com/Farooq-JK)

</div> 
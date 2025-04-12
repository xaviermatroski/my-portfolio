const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const session = require("express-session");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING);

// Create a Contact message schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", contactSchema);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to serve the main page
app.get("/", (req, res) => {
    res.render("index");
});

// API endpoint to handle contact form submissions
app.post("/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }
        
        // Save to database
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });
        
        await newContact.save();
        
        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'rishimahiya@gmail.com', // Your email address
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };
        
        transporter.sendMail(mailOptions);
        
        // Send success response
        res.status(200).json({ 
            success: true, 
            message: "Your message has been sent successfully!" 
        });
        
    } catch (error) {
        console.error("Error in contact form submission:", error);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while sending your message. Please try again later." 
        });
    }
});

// Port opening
app.listen(3000, function() {
    console.log("Server started on port 3000");
});

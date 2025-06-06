import express from "express";
import Contact from "../models/contact.Model.js";
import Newsletter from "../models/subscribe.Model.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message, agreement } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
      agreement,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
});

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    const [subscriber, created] = await Newsletter.findOrCreate({
      where: { email },
    });

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: subscriber,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error subscribing to newsletter",
      error: error.message,
    });
  }
});

export default router;

import { z } from "zod";
import fs from "fs";
import cloudinary from "../middilware/fileUpload/cloudinary-config.js";
import Event from "../models/schema/eventRegistrationFormSchema.js";
// Define the Zod schema for event submission
const eventSubmissionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.enum([
    "Music",
    "Sports",
    "Theater",
    "Workshop",
    "Conference",
    "Party",
    "Other",
  ]),
  location: z.object({
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    zipCode: z.string().min(1, { message: "ZipCode is required" }),
    coordinates: z.object({
      lat: z.coerce.number().min(-90).max(90, { message: "Invalid latitude" }),
      lng: z.coerce
        .number()
        .min(-180)
        .max(180, { message: "Invalid longitude" }),
    }),
  }),
  date: z.string(),
  time: z.string(),
  ticketTypes: z.array(
    z.object({
      type: z.enum(["General", "VIP", "Student", "Early Bird"]),
      price: z.coerce
        .number()
        .min(0, { message: "Price must be a positive number" }),
      quantity: z.coerce
        .number()
        .min(1, { message: "Quantity must be at least 1" }),
    })
  ),
  totalTickets: z.coerce
    .number()
    .min(1, { message: "Total tickets must be at least 1" }),
  image: z.string(), // Expect a URL string from Cloudinary

  organizerId: z.string(),
});

export const eventSubmissionForm = async (req, res, next) => {
  try {
    console.log(req.userId);

    const organizerId = req.userId;

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "events",
      use_filename: true,
      unique_filename: false,
    });

    // Delete the file from the local storage
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Failed to delete file", err);
      }
    });

    // Parse and validate the event data
    const eventData = eventSubmissionSchema.parse({
      ...req.body,

      image: result.secure_url, // Include the Cloudinary image URL in the event data
      organizerId,
    });

    // Send the validated event data with the image URL & organizerId

    const newEvent = new Event(eventData);
    await newEvent.save(); // Save the event to the database

    return res.status(200).json({
      message: "Event submitted successfully",
      data: eventData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    console.error("Error submitting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

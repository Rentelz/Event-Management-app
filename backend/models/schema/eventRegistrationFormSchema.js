import mongoose, { Schema } from "mongoose";
import User from "./signUpSchema.js";

const EventForm = new Schema(
  {
    organizerId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    name: { type: String, required: true }, // Name of the event
    description: { type: String, required: true }, // Detailed description of the event
    category: {
      type: String,
      enum: [
        "Music",
        "Sports",
        "Theater",
        "Workshop",
        "Conference",
        "Party",
        "Other",
      ],
      required: true,
    }, // Event category
    location: {
      address: { type: String, required: true }, // Street address of the event
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true }, // Latitude for geolocation
        lng: { type: Number, required: true }, // Longitude for geolocation
      },
    },
    date: { type: Date, required: true }, // Date of the event
    time: { type: String, required: true }, // Time of the event
    ticketTypes: [
      {
        type: {
          type: String,
          enum: ["General", "VIP", "Student", "Early Bird"],
          required: true,
        }, // Type of ticket
        price: { type: Number, required: true }, // Price of the ticket
        quantity: { type: Number, required: true }, // Total quantity of this ticket type
      },
    ],
    totalTickets: { type: Number, required: true }, // Total number of tickets available for the event
    soldTickets: { type: Number, default: 0 }, // Number of tickets sold
    imageUrl: { type: String }, // URL for the event image
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Canceled"],
      default: "Upcoming",
    }, // Event status
    isFeatured: { type: Boolean, default: false }, // Flag for featured events
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Event = mongoose.model("Event", EventForm);

export default Event;

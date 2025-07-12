const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");


/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * /api/customer/all:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of results
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of results to skip
 *     responses:
 *       200:
 *         description: List of all customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 total:
 *                   type: integer
 */

/**
 * @swagger
 * /api/customer/summary:
 *   get:
 *     summary: Get gender distribution summary
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Gender count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 genderCount:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: integer
 */

/**
 * @swagger
 * /api/customer/location-summary:
 *   get:
 *     summary: Get location type distribution summary
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Location Type summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: integer
 */

/**
 * @swagger
 * /api/customer/age-summary:
 *   get:
 *     summary: Get customer age group distribution
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Age group distribution
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   range:
 *                     type: string
 *                   count:
 *                     type: integer
 */

/**
 * @swagger
 * /api/customer/digital-interest-summary:
 *   get:
 *     summary: Get digital interest distribution
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Digital interest distribution
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   count:
 *                     type: integer
 */

/**
 * @swagger
 * /api/customer/login-hour-summary:
 *   get:
 *     summary: Get login hour distribution
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Login hour distribution summary
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   count:
 *                     type: integer
 */

/**
 * @swagger
 * /api/customer/brand-device-summary:
 *   get:
 *     summary: Get brand device usage distribution
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Brand device usage distribution
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   count:
 *                     type: integer
 */


router.get("/all", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 1000;
    const skip = parseInt(req.query.skip) || 0;

    const [data, total] = await Promise.all([
      Customer.find().skip(skip).limit(limit),
      Customer.countDocuments()
    ]);

    res.json({ data, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/summary", async (req, res) => {
  try {
    const genderCount = await Customer.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } }
    ]);
    res.json({ genderCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/location-summary", async (req, res) => {
  try {
    const result = await Customer.aggregate([
      { $group: { _id: "$locationType", count: { $sum: 1 } } },
    ]);
    const formatted = {};
    result.forEach(item => {
      formatted[item._id] = item.count;
    });
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch location summary" });
  }
});


router.get("/age-summary", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const summary = await Customer.aggregate([
      {
        $addFields: {
          realAge: { $subtract: [currentYear, "$age"] }, // hitung usia
        },
      },
      {
        $bucket: {
          groupBy: "$realAge",
          boundaries: [0, 20, 30, 40, 200],
          default: "Unknown",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    const formatted = summary.map((s) => ({
      range:
        s._id === 0
          ? "<20"
          : s._id === 20
          ? "20-29"
          : s._id === 30
          ? "30-39"
          : "≥40",
      count: s.count,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error in /age-summary:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/digital-interest-summary", async (req, res) => {
  const result = await Customer.aggregate([
    { $unwind: "$digitalInterest" },
    { $group: { _id: "$digitalInterest", count: { $sum: 1 } } },
  ]);
  res.json(result);
});


router.get("/login-hour-summary", async (req, res) => {
  try {
    const result = await Customer.aggregate([
      {
        $match: {
          loginHour: { $regex: /^[0-2]?[0-9]:[0-5][0-9]$/ } 
        }
      },
      {
        $addFields: {
          loginHourInt: {
            $toInt: {
              $arrayElemAt: [
                { $split: ["$loginHour", ":"] },
                0
              ]
            }
          }
        }
      },
      {
        $addFields: {
          hourRange: {
            $switch: {
              branches: [
                { case: { $lt: ["$loginHourInt", 6] }, then: "00:00–05:59" },
                { case: { $lt: ["$loginHourInt", 12] }, then: "06:00–11:59" },
                { case: { $lt: ["$loginHourInt", 18] }, then: "12:00–17:59" },
              ],
              default: "18:00–23:59"
            }
          }
        }
      },
      {
        $group: {
          _id: "$hourRange",
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    console.error("Error in /login-hour-summary:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/brand-device-summary", async (req, res) => {
  const result = await Customer.aggregate([
    { $group: { _id: "$brandDevice", count: { $sum: 1 } } },
  ]);
  res.json(result);
});



module.exports = router;

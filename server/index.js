import express from "express";
import session from "express-session";
import cors from "cors";

// Express app initialization
const app = express();
app.use(cors());
app.use(session({ secret: "MyApp" }));

var sessionOfGame;
// API to get next step
app.get("/api/transition/:nextStep", (req, res) => {
    if (parseInt(req.params.nextStep) == NaN) {
        res.status(400);
        res.send(`${req.params.nextStep} is invalid`);
    } else {
        if (sessionOfGame && sessionOfGame.data) {
            let data = String(sessionOfGame.data);
            if (req.params.nextStep == "1") {
                if (data.lastIndexOf("3") == data[data.length - 1] || data.lastIndexOf("13") == data.length - 2) {
                    res.send([2]);
                } else {
                    res.send([2, 3]);
                }
            } else {
                res.send([1]);
            }
            sessionOfGame.data += String(req.params.nextStep);
        } else {
            sessionOfGame = req.session;
            sessionOfGame.data = "1"; // First is blue
            res.send([2, 3]); // can choice green or yellow
        }
    }
});

app.get("/reset", (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
    });
    sessionOfGame.data = "";
    res.send([1]);
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});
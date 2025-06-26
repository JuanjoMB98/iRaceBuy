import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./VirtualTour.css";

export default function VirtualTour() {
    useEffect(() => {
        if (localStorage.getItem("virtualTourDone") === "true") return;

        const driverObj = driver({
            popoverClass: "driverjs-theme",
            overlayColor: "#1b3a69",
            showProgress: true,
            nextBtnText: "→",
            prevBtnText: "←",
            doneBtnText: "Done",
            overlayClickBehavior: "nextStep",
            stageRadius: 16,
            overlayOpacity: 0.5,
            disableActiveInteraction: true,
            steps: [
                {
                    popover: {
                        popoverClass: "driverjs-theme -centered",
                        title: "Welcome to iracebuy.com! 🏎️",
                        description:
                            "Let us show you how to easily plan your iRacing purchases and seasons.",
                        side: "top",
                        align: "center",
                    },
                },
                {
                    element: ".nav-enclosed-pills",
                    popover: {
                        title: "1. Choose a category",
                        description:
                            "Select the class you’re most interested in. If you want to see all series together, click on <strong>All Categories</strong>.",
                        side: "top",
                        align: "center",
                    },
                },
                {
                    element: ".-activeTab .season-select__control",
                    popover: {
                        title: "2. Add seasons",
                        description:
                            "Here you can add or remove the seasons you want to plan. <strong>Customize it as you like!</strong>",
                        side: "top",
                        align: "start",
                    },
                },
                {
                    element: ".-activeTab .o-raceTable ",
                    popover: {
                        title: "3. Check the schedule",
                        description:
                            "Review all the weeks and tracks for the selected series. <br><em>Click on the tracks to mark them as purchased or pending.</em>",
                        side: "top",
                        align: "start",
                    },
                },
                {
                    element: ".-activeTab .m-featuredTracks",
                    popover: {
                        title: "4. Featured tracks",
                        description:
                            "Here you’ll see the tracks that appear most often among all the series you’ve selected. Use this to optimize your purchases!",
                        side: "top",
                        align: "start",
                    },
                },
                {
                    element:
                        ".-activeTab .m-featuredTrack__item .m-featuredTrack__times",
                    popover: {
                        title: "Is it worth buying?",
                        description:
                            "This number shows how many times the track appears in your seasons. This helps you decide better!",
                        side: "top",
                        align: "start",
                    },
                },
                {
                    popover: {
                        popoverClass: "driverjs-theme -centered",
                        title: "All done! 🏁",
                        description:
                            "Now you know how to plan your purchases and seasons. If you found this helpful, share it with your friends!",
                    },
                },
            ],
            onDestroyed: () => localStorage.setItem("virtualTourDone", "true"),
        });
        driverObj.drive();
    }, []);

    return null; // No renderiza nada visible
}

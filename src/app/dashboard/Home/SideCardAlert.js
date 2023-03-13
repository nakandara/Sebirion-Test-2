import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { fontSize } from "@mui/system";
import image3 from '../../accets/hshd.PNG'

export const SideCardAlert = (
    <Card sx={{



        flexDirection: "column",

        minWidth: 340,
    }}>
        <div style={{ position: "relative" }}>
            <CardMedia
                style={{ height: "200px", paddingTop: "2%", borderRadius: "18px" }}
                component="img"
                image={image3}
                title="Pancakes"
                alt="Pancakes"
            />
            <div
                className="text-2xl inline-block font-serif text-left"
                style={{
                    position: "absolute",
                    color: "white",
                    top: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    fontSize: "15px",
                }}
            >
                Enjoy Your Finncial fredom with Famaliif
                <Button
                    sx={{ backgroundColor: "white", borderRadius: 6, marginTop: 4 }}
                >
                    Apply now gg
                </Button>
            </div>
        </div>
    </Card>
);

export const DebitCArd = (
    // <Card sx={{
    //     maxWidth: 345, margin: "5px", flexDirection: "column",

    //     minWidth: 340,
    // }}>
    //     <div style={{ position: "relative" }}>
    //         <CardMedia
    //             style={{ height: "200px", paddingTop: "2%", borderRadius: 6 }}
    //             component="img"
    //             image={
    //                 "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX669bNE5YaAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
    //             }
    //             title="Pancakes"
    //             alt="Pancakes"
    //         />

    //         <div
    //             className="ml-7  font-serif text-left"
    //             style={{
    //                 position: "absolute",
    //                 color: "white",
    //                 top: 10,
    //                 left: "50%",
    //                 transform: "translateX(-80%)",
    //                 fontWeight: "bold",

    //                 fontSize: "5px",
    //             }}
    //         >
    //             <div className="text-black text-sm ml-16">Alert Center</div>
    //             <div className="ml--16">
    //                 <Avatar className="ml-1" sx={{ bgcolor: "green", position: "left" }}>
    //                     <AssignmentIcon />
    //                 </Avatar>
    //             </div>

    //             <div sx={{ fontSize: "15px" }} className="text-black text-xs">
    //                 Bill ready To Pay
    //             </div>
    //             <div className=" text-gray-400/100">
    //                 You bill of 10000 kr to Name com Hostingis{" "}
    //             </div>

    //             <Button
    //                 className="mt-6"
    //                 sx={{ backgroundColor: "green", borderRadius: 6, color: "white" }}
    //             >
    //                 Pay
    //             </Button>
    //         </div>
    //     </div>
    // </Card>
    <Card sx={{



        flexDirection: "column",

        minWidth: 340,
    }}>
        <div style={{ position: "relative" }}>
            <CardMedia
                style={{ height: "200px", paddingTop: "2%", borderRadius: "18px" }}
                component="img"
                image={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX669bNE5YaAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
                }
                title="Pancakes"
                alt="Pancakes"
            />
            <div
                className=" inline-block m-4 "
                style={{
                    position: "absolute",
                    color: "black",
                    top: 10,
                    left: "50%",
                    transform: "translateX(-90%)",

                }}
            >
                <div className="font-bold">Alert Center</div>
                <div className="flex flex-row space-x-6 m-2 ">
                    <div>
                        <Avatar className="ml-1" sx={{ bgcolor: "green", position: "left" }}>
                            <AssignmentIcon />
                        </Avatar>
                    </div>
                    <div className="text-xs   ">
                        Bill Ready to pay <br />
                        <div className="mt-2 text-gray-400">   You bill of 10000 kr to Name com Hostingis</div>

                    </div>

                </div>

                <Button

                    sx={{ backgroundColor: "green", borderRadius: 6, color: "white", marginTop: 2, marginLeft: 15 }}
                >
                    Pay
                </Button>
            </div>
        </div>
    </Card>
);

export const EnjoyCart = (
    // <Card sx={{
    //     maxWidth: 345, margin: "5px", flexDirection: "column",

    //     minWidth: 340,
    // }}>
    //     <div style={{ position: "relative" }}>
    //         <CardMedia
    //             style={{ height: "200px", paddingTop: "2%", borderRadius: 6 }}
    //             component="img"
    //             image={
    //                 "https://img.freepik.com/premium-photo/sale-offer-black-friday-shopping-discount-closeup-woman-hand-holding-purchase-bags-isolated-orange-empty-space-background_279525-17960.jpg?w=996"
    //             }
    //             title="Pancakes"
    //             alt="Pancakes"
    //         />
    //         <div
    //             className="ml-7  font-serif text-left"
    //             style={{
    //                 position: "absolute",
    //                 color: "white",
    //                 top: 10,
    //                 left: "50%",
    //                 transform: "translateX(-50%)",
    //                 fontWeight: "bold",
    //                 fontStyle: "italic",
    //                 fontSize: "15px",
    //             }}
    //         >
    //             Enjoy Your Finncial fredom with Famaliif
    //             <Button
    //                 sx={{
    //                     backgroundColor: "white",
    //                     borderRadius: 6,
    //                     marginTop: "9px",
    //                     marginLeft: "15px",
    //                 }}
    //             >
    //                 Apply now
    //             </Button>
    //         </div>
    //     </div>
    // </Card>

    <Card sx={{



        flexDirection: "column",

        minWidth: 340,
    }}>
        <div style={{ position: "relative" }}>
            <CardMedia
                style={{ height: "200px", paddingTop: "2%", borderRadius: "18px" }}
                component="img"
                image={
                    "https://img.freepik.com/premium-photo/sale-offer-black-friday-shopping-discount-closeup-woman-hand-holding-purchase-bags-isolated-orange-empty-space-background_279525-17960.jpg?w=996"
                }
                title="Pancakes"
                alt="Pancakes"
            />
            <div
                className="font-bold"
                style={{
                    position: "absolute",

                    top: 10,
                    left: "65%",
                    transform: "translateX(-50%)",

                }}
            >
                <div className="text-white text-lg mt-6 mb-2   ">
                    Enjoy Your Finncial fredom with Famaliif
                </div>

                <Button
                    sx={{ backgroundColor: "white", borderRadius: 6, }}
                >
                    Apply now
                </Button>
            </div>
        </div>
    </Card>
);

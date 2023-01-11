import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ToggleButton from "@mui/material/ToggleButton";
import Avatar from "@mui/material/Avatar";

import PreviewVirtualHealthCard from "./PreviewVirtualHealthCard";


function EditVirtualHealthLinksAccordion() {
  //   const store = useSelector((store) => store);
  const [checked, setChecked] = React.useState(true);
  const containerRef = React.useRef(null);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
 
  const dispatch = useDispatch();
  const resourceToEdit = useSelector((store) => store.resourceToEdit);

  //used for the get icons button
  const [selected, setSelected] = useState(resourceToEdit.logo_url);
  const [result, setResult] = useState([resourceToEdit.logo_url]);

  let imgpath = "./images/vifidefault.jpeg";
  let noImagePath = "";

//console.log("resource to edit", medLinkToEdit);

  function updateResource(evt) {
    

    //update the database with edited info
    dispatch({
      type: "UPDATE_VIRTUALHEALTH_LINK",
      payload: {
        id: resourceToEdit.id,
        name: resourceToEdit.name,
        info_cost: resourceToEdit.info_cost,
        link: resourceToEdit.link,
        specialty: resourceToEdit.specialty,
        logo_url: selected,
        description: resourceToEdit.description
      },
    });
    dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: {} });
  }
  return (
    <Grid container>
      <Grid item xs={12} my={1}>
        <Accordion
        expanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container columnSpacing={1}>
              <Grid item xs={1} className="centerthis">
              <Avatar alt="" src={selected} sx={{ bgcolor: "white" }} />
                {/* <img src={selected} /> */}
              </Grid>
              <Grid item xs={4} px={1} className="centerthis">
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={resourceToEdit.name}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { name: e.target.value },
                    })
                  }
                  
                />
              </Grid>
              <Grid item xs={7} className="centerthis">
                <TextField
                  label="Url"
                  variant="outlined"
                  fullWidth
                  value={resourceToEdit.link}
                  onChange={(e) =>
                    dispatch({
                        type: "UPDATE_FIELD",
                        payload: { link: e.target.value },
                      })
                  }
                />
              </Grid>
              <Grid item xs={4} px={1} pt={2} className="centerthis">
                <TextField
                  label="Specialty"
                  variant="outlined"
                  fullWidth
                  value={resourceToEdit.specialty}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { specialty: e.target.value },
                    })
                  }
                  
                />
              </Grid>
              <Grid item xs={8} px={1} pt={2} className="centerthis">
                <TextField
                  label="Cost/Coverage"
                  variant="outlined"
                  fullWidth
                  value={resourceToEdit.info_cost}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { info_cost: e.target.value },
                    })
                  }
                  
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item xs={11}>
              <TextField
                variant="outlined"
                label="Description"
                fullWidth
                multiline
                maxRows={4}
                value={resourceToEdit.description}
                onChange={(e) =>
                    dispatch({
                        type: "UPDATE_FIELD",
                        payload: { description: e.target.value },
                      })
                }
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid container>
        <Grid item xs={1.8} textAlign={"start"}>
          <select
            onChange={(e) => {
              setSelected(e.target.value);
              dispatch({
                type: "UPDATE_FIELD",
                payload: { logo_url: e.target.value },
              });
            }}
           style={{marginLeft:0}}
          >
            <option disabled>Choose One</option>
            <option>{noImagePath}</option>
            <option>{imgpath}</option>
            {result.map((icon) => (
               icon == resourceToEdit.logo_url ?
               <option selected value={icon}>{icon}</option>
               :
               <option value={icon}>{icon}</option>
            ))}
          </select>
        </Grid>
        <Grid item xs={7.2}>
          <Button
            onClick={async () => {
              const url = new URL(resourceToEdit.link);
              console.log(url.hostname);
              const result = await axios.get(
                `https://favicongrabber.com/api/grab/${url.hostname}`
              );
              setResult(result.data.icons.map((icon) => icon.src));
              console.log(result.data.icons.map((icon) => icon.src));
            }}
          >
            get icons
          </Button>
        </Grid>
        <Grid item xs={1} textAlign={"end"}>
          <ToggleButton onClick={handleChange} selected={checked}>
            <Tooltip title={checked ? "Close":"Preview"} placement="top">
              <PhoneAndroidIcon />
            </Tooltip>
          </ToggleButton>
        </Grid>
        <Grid item xs={0.8} textAlign={"end"}>
          <Button
            onClick={() =>
              dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: {} })
            }
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={1.2} textAlign={"end"}>
          <Button variant="contained" onClick={updateResource}>Update Link</Button>
        </Grid>
        <Grid
          item
          xs={10}
          my={1}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          {checked && (
            <Slide direction="up" in={checked} container={containerRef.current}>
              {<PreviewVirtualHealthCard virthealthlink={resourceToEdit} />}
            </Slide>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EditVirtualHealthLinksAccordion;


import './AdminLandingPage.css';
import {useHistory} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from "react-csv";
import { Button, Stack, Typography, List, ListItem, Divider, Box } from '@mui/material';

function AdminLandingPage() {
	//add code comment
    // hooks
    const dispatch = useDispatch();
	const history = useHistory();

	// selectors
	const newsletterEmails = useSelector(store => store.newsletterEmails);
	
	const headers = [{ label: "Email Address", key: "email" }]
	const [heading, setHeading] = useState('Admin Landing Page');
	const [isClicked, setClicked] = useState(false);;

	useEffect(() => {
		dispatch({type: 'FETCH_NEWSLETTER_EMAILS'})
	}, []);

	function handleEmailClick() {
		setClicked(!isClicked);
		console.log('clicked?', isClicked)
	}

	const handleViewFeedback = () => {
		history.push('/adminfeedbackview');
	  }

	return (
		<>
			<Typography component="h1" variant="h3">Welcome, Laina!</Typography>
			<Box m='auto' display='flex' 
			alignItems="center" justifyContent="center"
			flexDirection="column">
				{ isClicked === true ?

					<Button variant="contained" color="primary" buttontext="white"
					sx={{width: '400px'}}
					onClick={handleEmailClick}
					> 
						Close Newsletter Sign-up Emails
					</Button>
				:
				
					<Button variant="contained" color="primary"
					sx={{width: '400px'}}
					onClick={handleEmailClick}
					> 
						View Newsletter Sign-up Emails
					</Button> 
				}
				{ isClicked === true ?
				<List>
				{ newsletterEmails.map(x => (
					<>
					<ListItem key={x.id}>{x.email}</ListItem>
					<Divider variant="inset" component="li" />
					</>
				))}
				</List>
				: null }
				
					<Button variant="contained" color="primary" 
					sx={{width: '400px'}}>
						<CSVLink 
							data={newsletterEmails} 
							headers={headers} 
							filename={"newsletter-emails.csv"}
						>
						Download Newsletter Emails Addresses
						</CSVLink>
					</Button>
					<Button variant="contained"
					sx={{width: '400px'}} 
					color = "primary"
					onClick = {handleViewFeedback}
					>View User Feedback
					</Button>
				
			</Box>
		</>
	);
}

export default AdminLandingPage;



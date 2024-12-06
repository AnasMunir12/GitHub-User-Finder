import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import { Box, Button, IconButton, InputBase, Stack, Typography } from '@mui/material';

function Githubfindry() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    avatar_url: "",
    name: "No Name Available",
    login: "No Username",
    bio: "No Bio Available",
    public_repos: "-",
    followers: "-",
    following: "-",
    location: "Not Available",
    company: "Not Available",
  });

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${query}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setUsers(data.items);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const fetchUserDetails = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setSelectedUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <>
      <Stack  mt={2} mb={2}>
        <Typography  fontWeight="bold" color="black"  
        sx={{
          textAlign: "center",
          fontSize: {
             xs: "15px",
             sm: "20px",
             md: "30px"  },
             }}  >
          GitHub User Finder
        </Typography>
      </Stack>

      <Stack
  sx={{
    width: {
      xs: '400px', // For small screens (mobile)
      sm: '500px', // For tablets
      md: '600px', // For desktops
    },
    border: 1,
    borderRadius: 2,
    backgroundColor: '#1e2a47',
    mx: 'auto',
    p: '10px',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }}
>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <IconButton sx={{ color: "#0370e9" }}>
            <SearchIcon fontSize="small" />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, color: "#fff" }}
            placeholder="Search GitHub by Name"
            inputProps={{ 'aria-label': 'search github user by name' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Stack>

      <Stack mt={2}   mx="auto" p={2} spacing={2}
      sx={{
        width: {
          xs: "400px",
          sm: "500px",
          md: "600px",
        }
      }}>
        {users.map((user) => (
          <Stack
            key={user.id}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            backgroundColor="#1e2a47"
            borderRadius={2}
            onClick={() => fetchUserDetails(user.login)}
            sx={{ cursor: "pointer", color: "#fff" }}
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <img
                src={user.avatar_url}
                alt="User Avatar"
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              />
              <Typography>{user.login}</Typography>
            </Stack>
            <Typography>GitHub ID: {user.id}</Typography>
          </Stack>
        ))}
      </Stack>

      <Stack
        border={1}
        mt={2}
        borderRadius={2}
        backgroundColor="#1e2a47"
        mx="auto"
        p="20px"
        color="white"
        sx={{
          width:{
            xs: "400px",
            sm: "500px",
            md: "600px",
          }
        }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <img
            src={selectedUser.avatar_url || "https://via.placeholder.com/80"}
            alt="User Avatar"
            style={{ borderRadius: "50%", width: "80px", height: "80px" }}
          />
          <Stack>
            <Typography variant="h6">{selectedUser.name}</Typography>
            <Typography>@{selectedUser.login}</Typography>
            <Typography>{selectedUser.bio}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={3} backgroundColor="#141d2f" borderRadius={2} p={2}>
          <Stack alignItems="center">
            <Typography>Repos</Typography>
            <Typography>{selectedUser.public_repos}</Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography>Followers</Typography>
            <Typography>{selectedUser.followers}</Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography>Following</Typography>
            <Typography>{selectedUser.following}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" mt={3} justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={1}>
            <IconButton sx={{ backgroundColor: "#4b6a9b" }}>
              <LocationOnIcon fontSize="small" />
            </IconButton>
            <Typography>{selectedUser.location}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <IconButton sx={{ backgroundColor: "#4b6a9b" }}>
              <BusinessOutlinedIcon fontSize="small" />
            </IconButton>
            <Typography>{selectedUser.company}</Typography>
          </Stack>
        </Stack>

        <Typography mt={7} display="flex" justifyContent="end" fontFamily="serif" fontWeight="bold">
          Copyright 2024. Designed By Anas Munir
        </Typography>
      </Stack>
    </>
  );
}

export default Githubfindry;

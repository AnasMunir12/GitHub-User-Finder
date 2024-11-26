import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import { Box, Button, IconButton, InputBase, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

function Githubfindry() {
  const [query, setQuery] = useState(""); // State for the search query
  const [users, setUsers] = useState([]); // State for the list of users
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user details

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${query}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.items); // Set the list of users
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const fetchUserDetails = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setSelectedUser(data); // Set the details of the selected user
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <>
      {/* Title */}
      <Stack ml={40} mb={2}>
        <Typography fontSize={"30px"} fontWeight={"bold"} color="black">
          GitHub User Finder
        </Typography>
      </Stack>

      {/* Search Input and Button */}
      <Stack
        width={"600px"}
        border={1}
        borderRadius={2}
        backgroundColor={"#1e2a47"}
        mx={"auto"}
        p={"10px"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <IconButton sx={{ color: "#0370e9" }}>
            <SearchIcon fontSize="small" />
          </IconButton>

          <InputBase
            sx={{ ml: 1, flex: 1, color: "#fff" }}
            placeholder="Search GitHub by Name"
            inputProps={{ 'aria-label': 'search github user by name' }}
            value={query} // Bind input value to state
            onChange={(e) => setQuery(e.target.value)} // Update state on input change
          />
        </Box>

        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Stack>

      {/* Display Search Results */}
      <Stack mt={2} width={"600px"} mx={"auto"} p={2} spacing={2}>
        {users.map((user) => (
          <Stack
            key={user.id}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            backgroundColor={"#1e2a47"}
            borderRadius={2}
            onClick={() => fetchUserDetails(user.login)} // Fetch details when a user is clicked
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

      {/* Display Selected User Details */}
      {selectedUser && (
        <Stack
          width={"600px"}
          border={1}
          mt={2}
          borderRadius={2}
          backgroundColor={"#1e2a47"}
          mx={"auto"}
          p={"20px"}
          color="white"
        >
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <img
              src={selectedUser.avatar_url}
              alt="User Avatar"
              style={{ borderRadius: "50%", width: "80px", height: "80px" }}
            />
            <Stack>
              <Typography variant="h6">{selectedUser.name || "No Name Available"}</Typography>
              <Typography>@{selectedUser.login}</Typography>
              <Typography>{selectedUser.bio || "This profile has no bio"}</Typography>
            </Stack>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            mt={3}
            backgroundColor={"#141d2f"}
            borderRadius={2}
            p={2}
          >
            <Stack alignItems={"center"}>
              <Typography>Repos</Typography>
              <Typography>{selectedUser.public_repos}</Typography>
            </Stack>
            <Stack alignItems={"center"}>
              <Typography>Followers</Typography>
              <Typography>{selectedUser.followers}</Typography>
            </Stack>
            <Stack alignItems={"center"}>
              <Typography>Following</Typography>
              <Typography>{selectedUser.following}</Typography>
            </Stack>
          </Stack>

          <Stack direction={"row"} mt={3} justifyContent={"space-between"}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <IconButton sx={{ backgroundColor: "#4b6a9b" }}>
                <LocationOnIcon fontSize="small" />
              </IconButton>
              <Typography>{selectedUser.location || "Not Available"}</Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <IconButton sx={{ backgroundColor: "#4b6a9b" }}>
                <BusinessOutlinedIcon fontSize="small" />
              </IconButton>
              <Typography>{selectedUser.company || "Not Available"}</Typography>
            </Stack>
          </Stack>
          <Typography mt={7} display={'flex'} justifyContent={'end'}  fontFamily={'serif'} fontWeight={'bold'}>Copyright 2024.Designed By Anas Munir</Typography>
        </Stack>
      )}
    </>
  );
}

export default Githubfindry;

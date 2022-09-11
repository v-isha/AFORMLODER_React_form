
import { Grid, TextField, Typography,FormControlLabel, Checkbox, Button, Box,Alert,  
MenuItem, Select, FormControl, FormLabel, RadioGroup, Radio, FormGroup, Stack, Table,TableBody, 
TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles'


import { useState } from 'react'


const App = () => {


// style for button
const Input = styled('input')({
  display: 'none',
});


// states
const [name ,setName] =useState()
const [email ,setEmail] =useState()
const [st , setSt] =useState('')  
const [gender,setgender] =useState()
const [pjl,setPjl] =useState([])
const [pimage, setPimage] = useState('')
const [rdoc, setRdoc] = useState('')
const [error, setError] = useState({
  status: false,
  msg: "",
  type: ""
})


// checkbox
const getPjl = (e) => {
    const {value,checked} =e.target
    if(checked){
      setPjl([...pjl,value])

    }
    else{
      setPjl(pjl.filter((e)=>e !== value))
    }




}

// clearform

const resetForm =()=>{
  setName('')
  setEmail('')
  setSt('')
  setgender('')
  setPjl([])
  setPimage('')
  setRdoc('')
 
  
}





// handlesbumit

const handleSubmit = (e)=>{
    e.preventDefault();
    const data = new FormData()
    console.log(data)
    data.append('name',name)
    data.append('email',email)
    data.append('st',st)
    data.append('gender',gender)
    data.append('pjl',pjl)
    data.append('pimage',pimage)
    data.append('rdoc',rdoc)
    if(name && email){
      console.log(data.get('name'))
      console.log(data.get('email'))
      console.log(data.get('st'))
      console.log(data.get('gender'))
      console.log(data.get('pjl'))
      console.log(data.get('pimage'))
      console.log(data.get('rdoc'))
      setError({ status: true, msg: "Resume Uploaded Successfully", type: 'success' })
      resetForm()
      document.getElementById("resume-form").reset()
    }
    else{
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }






}







return (
    <>
          <Box display="flex" justifyContent="center" sx={{backgroundColor:"#002f6c", padding: 2, margin: 0}}>
            <Typography variant='h5' component="div" sx={{fontWeight:"bold" , color:"white"}}>
            EMPOLYEE DETAILS SECTION</Typography>
          </Box>
          {/* grid */}
          <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={5}>
                  <Box display="flex" justifyContent="center" sx={{backgroundColor:"#aec4c7", padding: 1 , marginTop:1}}>
                    <Typography variant='h6' component="div" sx={{fontWeight:"bold" , color:"white"}}>
                     Documentation-Block</Typography>
                    </Box>
                    {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}

                    <Box component="form" id="resume-form" noValidate sx={{padding : 2 ,backgroundColor:"#e0f7fa"}} onSubmit={handleSubmit} >
                          <TextField id="name" name="name" label="Name" required fullWidth margin='normal' 
                          onChange={(e)=>setName(e.target.value)}/>
                          <TextField id="email" name="email" label="Email_id" required fullWidth margin='normal'
                           
                           onChange={(e)=>setEmail(e.target.value)}/>
                          <FormControl fullWidth margin='normal'>
                              <FormLabel id="state-select-label">State</FormLabel>
                              {/* <InputLabel id="state-select-label" label="State">State</InputLabel> */}
                              <Select labelId='state-select-label' id='state-select' 
                                 label="st" onChange={(e)=>{setSt(e.target.value)}}>
                                <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                                <MenuItem value="Bihar">Bihar</MenuItem>
                                <MenuItem value="West Bengal">West Bengal</MenuItem>
                              </Select>
                          </FormControl>
                          <FormControl fullWidth margin='normal'>
                              <FormLabel id="gender-radio">Gender</FormLabel>
                              <RadioGroup row name="gender">
                                  <FormControlLabel value="male" control={<Radio/>} label="Male" 
                                  onChange={(e)=>setgender(e.target.value)}/>
                                  <FormControlLabel value="female" control={<Radio/>} label="Female"
                                  onChange={(e)=>setgender(e.target.value)}/>
                                  <FormControlLabel value="other" control={<Radio/>} label="Other"
                                  onChange={(e)=>setgender(e.target.value)}/>
                              </RadioGroup>
                          </FormControl>

                          {/* checkbox */}
                          <FormControl component='fieldset' fullWidth margin='normal'>
                              <FormLabel component='legend'>Preferred Job Location:</FormLabel>
                              <FormGroup row>
                                <FormControlLabel control={<Checkbox />} label="Delhi" value="Delhi"
                                onChange={(e)=>getPjl(e)}/>
                                <FormControlLabel control={<Checkbox />} label="Mumbai" value="Mumbai" 
                                 onChange={(e)=>getPjl(e)}/>
                                <FormControlLabel control={<Checkbox />} label="Banglore" value="Banglore"
                                 onChange={(e)=>getPjl(e)}/>
                                <FormControlLabel control={<Checkbox />} label="Ranchi" value="Ranchi" 
                                 onChange={(e)=>getPjl(e)}/>
                                
                              </FormGroup>
                          </FormControl>
                          <Box fullWidth margin='normal' sx={{paddingTop: 2 }} >
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <label htmlFor='profile-photo'>
                              <Input accept="image/*" id="profile-photo" type="file" 
                               onChange={(e) => { setPimage(e.target.files[0]) }} />
                              <Button variant='contained' component='span'>Upload Photo </Button>
                            </label>
                            <label htmlFor="resume-file">
                              <Input accept="doc/*" id="resume-file" type="file" 
                              onChange={(e) => { setRdoc(e.target.files[0]) }}/>
                              <Button variant="contained" component="span">Upload File</Button>
                            </label>
                          </Stack>
                          </Box>
                          
                          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}
                           color="error">Submit</Button>
                          
                </Box>
                  
                </Grid>
                <Grid item xs={7}>
                      <Box display="flex" justifyContent="center" sx={{backgroundColor:"info.light", padding: 1 , marginTop:1}}>
                              <Typography variant='h6' component="div" sx={{fontWeight:"bold" , color:"white"}}>
                              List of Empolyees</Typography>
                     </Box>
                     <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                {/* <TableCell align="center">DOB</TableCell> */}
                                <TableCell align="center">State</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">Location</TableCell>
                                <TableCell align="center">Profile</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                            
                              <TableRow sx={{'&:Last-child td, &:last-child th': { border: 0 } }}> 
                                  <TableCell align="center" component="th" scope="row">Isha</TableCell>
                                  <TableCell align="center">Isha@gmail.com</TableCell>
                                 
                                  <TableCell align="center">Delhi</TableCell>
                                  <TableCell align="center">Female</TableCell>
                                  <TableCell align="center">Delhi</TableCell>
                                  <TableCell align="center"><Avatar src="" /></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                </Grid>            





          </Grid>






















    </>
  )
}

export default App
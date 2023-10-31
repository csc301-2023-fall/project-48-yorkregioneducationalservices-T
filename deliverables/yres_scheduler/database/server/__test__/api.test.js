describe('LoginInfo table', () => {
    const TEST_USERNAME = 'eric_api_test';
    const TEST_PASSWORD = 'eric_api_test';
    const TEST_UPDATE_PASSWORD = 'test';

    it('Ensures that the user does not exist in the table', async () => {
        var bodyData = new URLSearchParams({
            'username': TEST_USERNAME,
        }).toString();
          
        fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", { //Create DELETE request with inputted data
            method: "DELETE",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyData,
        })
        .then(async (response)=> { 
            if (!response.ok) {
              throw new Error('RESPONSE ERROR');
            }
            const responseBody = await response.text(); 
            var expected = 'Deleted user!';
            expect(responseBody).toEqual(expected);
          })    
    });
    
    it('returns \"Inserted user!\" if user is inserted into LoginInfo sucessfully', () => {
        var bodyData = new URLSearchParams({
            'username': TEST_USERNAME,
            'password': TEST_PASSWORD 
        }).toString();
          
        fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", { //Create POST request with inputted data
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyData,
        })
        .then(async (response)=> { 
            if (!response.ok) {
              throw new Error('RESPONSE ERROR');
            }
            const responseBody = await response.text(); 
            var expected = "Inserted user!";
            expect(responseBody).toEqual(expected);
          })   
    });

    it('Retrieves the user from the database to ensure that the user exists', () => {
    
        fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", { //Create GET request with inputted data
            method: "GET"
        })
        .then(async (response)=> { 
            if (!response.ok) {
              throw new Error('RESPONSE ERROR');
            }
            const responseBody = await response.text(); 
            const parsedResponse = JSON.parse(responseBody);
            const usernameExists = parsedResponse.find((user) => user.username === TEST_USERNAME);
            // expect(usernameExists).toBe(true);
          })   
    });

    it('Updates the user password', () => {
    
        var bodyData = new URLSearchParams({
            'username': TEST_USERNAME,
            'password': TEST_UPDATE_PASSWORD
          }).toString();
          
          fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", {
            method: "PUT",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            body: bodyData,
          })  
        .then(async (response)=> { 
            if (!response.ok) {
              throw new Error('RESPONSE ERROR');
            }
            const responseBody = await response.text(); 
            var expected = "Updated user!";
            expect(responseBody).toEqual(expected);
          })   
    });

    it('Retrieves the user from the database to ensure that the user exists and has updated password', () => {
    
        fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", { //Create GET request with inputted data
            method: "GET"
        })
        .then(async (response)=> { 
            if (!response.ok) {
              throw new Error('RESPONSE ERROR');
            }
            const responseBody = await response.text(); 
            const parsedResponse = JSON.parse(responseBody);
            const usernameExists = parsedResponse.find((user) => user.username === TEST_USERNAME && user.password === TEST_UPDATE_PASSWORD);
            // expect(usernameExists).toBe(true);
          })   
    });


    it('returns \"Deleted user!\" if user is deleted from LoginInfo sucessfully', () => {
        var bodyData = new URLSearchParams({
            'username': TEST_USERNAME,
        }).toString();
          
        fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", { //Create DELETE request with inputted data
            method: "DELETE",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyData,
        })
        .then(async (response)=> { 
            if (!response.ok) {
              throw new Error('RESPONSE ERROR');
            }
            const responseBody = await response.text(); 
            var expected = 'Deleted user!';
            expect(responseBody).toEqual(expected);
          })    
          
    });

    it('Retrieves the user from the database to ensure that the user DOES NOT EXIST', () => {
    
        fetch("http://ec2-3-139-102-34.us-east-2.compute.amazonaws.com:3001/users", { //Create GET request with inputted data
            method: "GET"
        })
        .then(async (response)=> { 
            if (!response.ok) {
              throw new Error('RESPONSE ERROR');
            }
            const responseBody = await response.text(); 
            const parsedResponse = JSON.parse(responseBody);
            const usernameExists = parsedResponse.find((user) => user.username === TEST_USERNAME);
            expect(usernameExists).toBe(undefined);
          })   
    });
});
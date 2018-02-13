Answer 1: This version of `.gitignore` is about half as long. 
          There is one `.gitignore` file in each the source, 
          server, and client folders. Each file contains only 
          what the section that it is in needs.

Answer 2: There is one to build each the client and server
          separately, and one in the source folder that builds both.

Answer 3: The HTML for the navbar is in `app.component.html`, which 
          is on the client side of the project. The HTML uses `app.routes.ts` 
          to route to the _home_ and _users_ pages. SparkJava is 
          not the only thing that is routing.

Answer 4: It gets the user list from the DB. It allows `user-list.component.ts` 
          to be distanced from the DB so that it doesn't need to 
          know how to communicate with the DB. Because of this, 
          `user-list.component.ts` doesn't have any references to any URLs.          

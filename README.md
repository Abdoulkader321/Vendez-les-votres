*****
<h1 style="text-align: center">
    Vendez les vôtres
</h1>

## Authors

- Abdoulkader MOUSSA MOHAMED
- Aboubacar DIAWARA

## Table of content
* [Users](#Users)
  * [Customer](#Customer)
  * [Developer](#Developer)
* [Additionnal Information](#Others)

## Users <a id="Users"></a>
### Prerequisite <a id="prerequisite"></a>
To run the game, you should have:
- [npm](): the game has been developed with the version `8.5.1`
- [node js](): We used the `v17.3.0`
- `A web navigator` client (example: firefox, google chrome ...)
- [git](): optional. This program is useful for cloning the repository. You can manually 
download the project.

Ensure these previous program are ready on you machine. Then read the next sections.

### Customer <a id="Customer"></a>
#### Step 1: go to the server folder
```shell
$ cd server/
```

### Step 2: install the dependencies
```shell
$ npm install
```

### Step 3: Launch the data base server
```shell
$ mkdir dbData
$ mongod --dbpath dbData
```


#### Step 4: run the server
To run the server, you can:
- use nodemon
```shell
$ nodemon
```
- use node js
```shell
$ npm run start
```

> You can notice in your console a litlle description which indicated on which port your 
> server is runing.
> > Example:
> > > node main.js  
> > > server running on port 3000 <<<

if you see the following description in your console:
``` port X is already in use```,  change the following line of code in the file bin/www:
```js
// line 15
var port = normalizePort(process.env.PORT || '3000');
```
into for example:
```js
// line 15
var port = normalizePort(process.env.PORT || '5000');
```
and rerun the server.

### step 5: run the game
You can use a web brower to open the game address:
> http://localhost:`<port>`/
> > if port is 3000, the link will look like
> 
> http://localhost:3000/

### Developer <a id="Developer"></a>

## Others <a id="Others"></a>
### Folder hierarchies
```bash
# project folders hierarchie
.
├── client
│   └── public
    └── src
        ├── components
        ├── data
        ├── scripts
        └── styles

└── server
    ├── controllers
    ├── models
    ├── views
    ├── public
    ├── config
    ├── middlewares
    ├── routes
```


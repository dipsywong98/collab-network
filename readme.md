# collab-network

## Set up the application

1. git clone the project

2. download the data_cache and put to `/data_cache/` directory

    [author.db](https://hkustconnect-my.sharepoint.com/:u:/g/personal/ycwongal_connect_ust_hk/EXyOelcbjyhBmiw0Ot6mwa0BH98GUkAEYPD2C_Wwx6EBTA?e=gy2fMZ)
    
    [whole_graph.edgelist.gz](https://hkustconnect-my.sharepoint.com/:u:/g/personal/ycwongal_connect_ust_hk/EWZVomI0I-JPoVx13lNfylYBZkhSmjqxAv431CNBMAxRjA?e=vrKCWM)

3. install [nodejs](https://nodejs.org/en/download/), [yarn](https://classic.yarnpkg.com/en/docs/install) and [conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html)

4. build the website client which is under `client/` directory

    ```shell script
    cd client && yarn && yarn build
    ```

5. install python dependencies

    ```shell script
    conda install pyvis
    ```
   
6. start python server
    
    ```shell script
    python server.py
    ```

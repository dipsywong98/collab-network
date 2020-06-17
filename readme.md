# collab-network

## Download

[Offline App(windows)](
https://hkustconnect-my.sharepoint.com/:u:/g/personal/ycwongal_connect_ust_hk/EYHoYibXDy9PgSSSgCLutw4B4ABsm7KPFmeaxPPkVpvlKQ?e=IuGeMW
) (no need set up, just download and play, have fun!)

[Report](https://drive.google.com/file/d/1bUHnvHQ416e3MyFHgweG4s1--C_hVzoV/view?usp=sharing)

## Set up the application server

1. git clone the project

2. download the data_cache and put to `/data_cache/` directory

    [author.db](https://hkustconnect-my.sharepoint.com/:u:/g/personal/ycwongal_connect_ust_hk/EXyOelcbjyhBmiw0Ot6mwa0BH98GUkAEYPD2C_Wwx6EBTA?e=gy2fMZ)
    
    [whole_graph.edgelist.gz](https://hkustconnect-my.sharepoint.com/:u:/g/personal/ycwongal_connect_ust_hk/EWZVomI0I-JPoVx13lNfylYBZkhSmjqxAv431CNBMAxRjA?e=vrKCWM)

3. install [nodejs](https://nodejs.org/en/download/), [yarn](https://classic.yarnpkg.com/en/docs/install) and [conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html)

    ```shell script
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
   curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
   echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
   sudo apt update && sudo apt install yarn
    ```
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

## Build and Publish

use virtual env to install all the dependencies
https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/

using virtual env run `python build.py`

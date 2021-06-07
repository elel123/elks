import React, { Component } from 'react';
import { getToken } from "../util/jwt";


class ActivityPerPageGrid extends Component { 
    // initialize variables 
    constructor(props) { 
        super(props); 
        this.state = {
            displayGridId: 0,
            popPagesNames: ["Loading...", "Loading...", "Loading..."],
        }
    }

    setDisplayGridId( newId) { 
        this.setState( (state) => { 
            return {displayGridId: newId}
        });
    }

    //Intialize data to grid here 
    componentDidMount() { 
        // Grab 3 most popular page paths ( in terms of popularity)
        fetch(
            `https://www.elks.codes/server/api/activity/pages?jwt=${getToken()}`, 
            { 
                method: 'GET',
                headers:{
                    'Accept': 'application/json'
                }
            }
        ).then( async (data) => {
            if (data.status === 200) {
                let respData = await data.json();

                let filtered = []; 
                for (let page of respData) {
                    if (page._id === null || page._id === "" || page._id.indexOf("public_html") !== -1) {
                        continue;
                    }
                    filtered.push([page._id, page.count]);
                }
        
                filtered.sort((a, b) => {return b[1] - a[1]});

                this.setState(() => {
                    return {
                      popPagesNames: [filtered[0][0], filtered[1][0], filtered[2][0]]
                    }
                  });
            } 
        })
        .catch((error) => {
            console.error(error); 
        })     
    }

    render() {
        // let pagePath = this.state.popPagesNames[this.state.displayGridId]; 
        let pagePath = this.props.pageNames
        return (
            <div>
                <zing-grid 
                    id="activity-per-page-grid" 
                    caption={`Activity Info for Page: ${pagePath}`} 
                    pager 
                    page-size="10"
                    page-size-options="10" 
                    layout="row" 
                    layout-controls="disabled" 
                    width="1000"
                    viewport-stop
                    loading>
                        <zg-caption>
                            Something Something Something 
                        </zg-caption>
                        <zg-data>
                            <zg-param name="src" value={`https://elks.codes/server/api/activity/pageactivityinfo.json`}></zg-param>
                            <zg-param name="queryString" value={`jwt=${getToken()}&pagePath=${pagePath}&pageSize=10`}></zg-param>
                            <zg-param name="recordPath" value="info"></zg-param>
                            
                            <zg-param name="loadByPage" value="true"></zg-param>
                            <zg-param name="pageKey" value="page"></zg-param>

                            <zg-param name="countPath" value="count"></zg-param>
                        </zg-data>
                        
                </zing-grid>
            </div>
        );
    }
}

export default ActivityPerPageGrid; 

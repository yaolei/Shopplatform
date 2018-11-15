export let URL ={
    briefInfo:{
        getDefaultNode: '/forecast-forecastingnode/initialize',
        loadNodeDetail: '/forecast-forecastingnode/loadNodeDetail',
        getNodePicture: '/forecast-profile/picture?picture=',
        setDefaultNode: '/forecast-forecastingnode/setDefaultNode',
        loadForecastNodes: '/forecast-nodelist/loadForecastNodes/',
        filterNodes: '/forecast-nodelist/filterForecastNodes'
    },
    dealList:{
        getDealListFilter: '/forecast-deallist-li/dealListFilter',
        dealListByOpportunity:'/forecast-deallist-oppt/dealListByOpportunity',
        dealListByLineItem: '/forecast-deallist-li/dealListByLineItem',
        typeahead: '/forecast-deallist-li/filter/typeahead',
        totalAmount: '/forecast-deallist-li/totalAmount'
    },
    roadmapSummary:{
        loadBreakOutGroup:'/forecast-roadmapsum/loadRoadmapSummaryBreakOutGroup',
        loadRoadmapSummary:'/forecast-roadmapsum/loadRoadmapSummary',
        loadTotalBreakOut2: 'forecast-roadmapsum/loadRoadmapSummaryTotalBreakOut2',
        loadBreakOut2:'/forecast-roadmapsum/loadRoadmapSummaryBreakOut2',
        loadBreakOut3:'/forecast-roadmapsum/loadRoadmapSummaryBreakOut3',
        loadTotalBreakOut3: 'forecast-roadmapsum/loadRoadmapSummaryTotalBreakOut3'
    },
    profile:{
        setUserSetting:'forecast-profile/setUserSetting',
        getUserSetting:'/forecast-profile/getUserSetting',
        accessibility: '/forecast-login/accessibility'
    },
    totalSummary:{
        getTotalData: '/forecast-roadmapsum/loadTotalAmount'
    },
    weeklyForecase:{
        roadmapStatByWeek: '/forecast-roadmap-stat/roadmapStatByWeek'
    }
}
import {BranchesOutlined, DashboardOutlined, DatabaseOutlined} from "@ant-design/icons";

import {Layout, Menu, Typography} from "antd";
import 'antd/dist/antd.css';
import {Footer, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, {useCallback} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Route, useHistory, useLocation} from "react-router-dom";
import {contextPath} from "./context";
import {EventsPage} from "./pages/EventsPage";
import {ProcessorStatusPage} from "./pages/ProcessorStatusPage";
import {TokenManagementPage} from "./pages/TokenManagementPage";
import store from "./redux/store";

function AppMenu() {
    const history = useHistory();
    const location = useLocation();
    const onSelectCallback = useCallback(({key}) => {
        history.push(`/${contextPath}${key}`)
    }, [history])

    const realUrl = location.pathname.startsWith("/" + contextPath) ? location.pathname.substr(contextPath.length + 1) : location.pathname

    const selectedKey = realUrl === "/" ? "/tokens" : realUrl;
    return <Menu
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        defaultOpenKeys={['/tokens']}
        onSelect={onSelectCallback}
        style={{height: '100%', borderRight: 0}}
    >
        <Menu.Item key="/tokens"><BranchesOutlined/> Token Management</Menu.Item>
        <Menu.Item key="/processors"><DashboardOutlined/> Processor Status</Menu.Item>
        <Menu.Item key="/events"><DatabaseOutlined/> Events log</Menu.Item>
    </Menu>;
}

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Layout style={{minHeight: '100vh'}}>
                    <Header className="header">
                        <img src="logo.png" alt={"codecentric Logo"}/>
                        <Typography.Title className={"title"} level={1}>Axon Open Admin</Typography.Title>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <AppMenu/>
                        </Sider>
                        <Layout style={{padding: '0 24px 24px'}}>
                            <Layout.Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >

                                <Route path={`/${contextPath}/`} exact><TokenManagementPage/></Route>
                                <Route path={`/${contextPath}/tokens`}><TokenManagementPage/></Route>
                                <Route path={`/${contextPath}/processors`}><ProcessorStatusPage/></Route>
                                <Route path={`/${contextPath}/events`}><EventsPage/></Route>
                            </Layout.Content>
                        </Layout>
                    </Layout>
                    <Footer>
                        <div style={{textAlign: 'center'}}>
                            <span>Axon Open Admin was built by <a target="_blank" rel="noreferrer" href={"https://codecentric.nl"}>codecentric Netherlands</a></span>
                        </div>
                    </Footer>
                </Layout>
            </Provider>
        </BrowserRouter>
    );
}

export default App;

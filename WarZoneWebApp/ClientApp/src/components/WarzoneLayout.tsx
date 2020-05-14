import React, {
    Component,
    useContext,
    useEffect,
    useState
    } from 'react';
import Resources from '../Resources';
import { AppContext, IAppContext } from '../App';
import {
    Breadcrumb,
    Button,
    Layout,
    Menu
    } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';




const { Header, Content, Footer } = Layout;

const WarzoneLayoutInner: React.FunctionComponent<RouteComponentProps> = (props) => {
    const [chosenReceipt, setChosenReceipt] = useState<string>("");
    const { appUser } = useContext<IAppContext>(AppContext);

    const changePage = (page: string) => {
        props.history.push(page);
    }

    const currentReceiptReducer = null;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('');
            res.json().then(res => setChosenReceipt(res));
        }
    })


    const getCurrentSelectedPage = () => {
        //alert("SPRAWDZAM");
        switch (props.history.location.pathname) {
            case Resources.pageAdresses.consent:
                return "2";
            case Resources.pageAdresses.home:
                return "1";
            case Resources.pageAdresses.offer:
                return "3";
            case Resources.pageAdresses.receipts:
                return "4";
        }
        return "1";
    }

    return (
        <Layout className="layout">
            <Header color="white" >
                <div className="logo" onClick={() => changePage(Resources.pageAdresses.home)}>
                    <img src="http://www.war-zone.com.pl/wp-content/uploads/2016/01/LOGO_FB.png" style={{
                        maxHeight: "48px",
                        height: "auto",
                        width: "auto",
                        display: "inline",
                        marginLeft: 10

                    }}>
                    </img>

                </div>
                <Menu
                    mode="horizontal"
                    selectedKeys={[getCurrentSelectedPage() as string]}
                    style={{
                        margin: "20px 80px",
                        lineHeight: "25px"
                    }}
                    theme="dark"
                >
                    <Menu.Item onClick={() => changePage(Resources.pageAdresses.home)}
                        key="1">
                        Strona Główna
						</Menu.Item>
                    {appUser &&
                        <Menu.Item
                            onClick={() => changePage(Resources.pageAdresses.consent)}
                            key="2"
                        >
                            Regulamin
						</Menu.Item>}
                    <Menu.Item
                        onClick={() => changePage(Resources.pageAdresses.offer)}
                        key="3"
                    >
                        Oferta
						</Menu.Item>
                    {appUser && appUser.id == 1 &&
                        <Menu.Item
                            onClick={() => changePage(Resources.pageAdresses.receipts)}
                            key="4"
                        >
                            Otwarte rachunki
						</Menu.Item>}
                    {/*                     {props.selectedReceipt &&
                        <MenuItem>
                            Wybrany rachunek: {console.log(props.selectedReceipt.id + "\n" + props.selectedReceipt.totalPrice)}
                        </MenuItem>
                    } */}
                </Menu>
            </Header>
            <Content style={{ padding: '80px 25px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: window.screen.availHeight * .9 }}>
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}><div className="kliven-centered">Created by KlivenINC</div></Footer>
        </Layout>
    );
};
//export default connect(mapStateToProps, mapDispatchToProps)(Receipts);

export default withRouter(WarzoneLayoutInner);
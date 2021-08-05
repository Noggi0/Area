import React, { FunctionComponent } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions, Linking } from'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Axios from 'axios';
import { WebView } from 'react-native-webview';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'; 

class Home extends React.Component {

    Login = (url) => {
        const supported =  Linking.canOpenURL(url);

        if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
            Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    async openLink(url) {
        try {
          if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.open(url, {
              // iOS Properties
              dismissButtonStyle: 'cancel',
              preferredBarTintColor: '#453AA4',
              preferredControlTintColor: 'white',
              readerMode: false,
              animated: true,
              modalPresentationStyle: 'fullScreen',
              modalTransitionStyle: 'coverVertical',
              modalEnabled: true,
              enableBarCollapsing: false,
              // Android Properties
              showTitle: true,
              toolbarColor: '#6200EE',
              secondaryToolbarColor: 'black',
              enableUrlBarHiding: true,
              enableDefaultShare: true,
              forceCloseOnRedirection: false,
              // Specify full animation resource identifier(package:anim/name)
              // or only resource name(in case of animation bundled with app).
              animations: {
                startEnter: 'slide_in_right',
                startExit: 'slide_out_left',
                endEnter: 'slide_in_left',
                endExit: 'slide_out_right'
              },
              headers: {
                'my-custom-header': 'my custom header value'
              }
            })
            Alert.alert(JSON.stringify(result))
          }
          else Linking.openURL(url)
        } catch (error) {
          Alert.alert(error.message)
        }
    }

    constructor(props) {
        super(props);
        this.servicesActions = [
            { name: 'Intra Epitech', image: require('../images/epitech2.png'), color: '#006ab3', key: '1'},
            { name: 'Twitter', image: require('../images/twitter.png'), color: '#0099CC', key: '2'},
            { name: 'OneDrive', image: require('../images/oneDrive.png'), color: '#0066CC', key: '3'},
            { name: 'Reddit', image: require('../images/reddit.png'), color: '#FF5700', key: '4'},
            { name: 'Google Drive', image: require('../images/google_drive.png'), color: '#333366', key: '5'},
            { name: 'Météo', image: require('../images/meteo.png'), color: '#0099CC', key: '6'},
            { name: 'Twitch', image: require('../images/twitch.png'), color: '#663399', key: '7'},
            { name: 'Youtube', image: require('../images/youtube.png'), color: 'red', key: '8'},
            { name: 'Google Calendar', image: require('../images/google_calendar.png'), color: '#0066FF', key: '9'},
        ];
        this.servicesReactions = [
            { name: 'Intra Epitech', image: require('../images/epitech2.png'), color: '#006ab3', key: '1'},
            { name: 'Twitter', image: require('../images/twitter.png'), color: '#0099CC', key: '2'},
            { name: 'Reddit', image: require('../images/reddit.png'), color: '#FF5700', key: '3'},
            { name: 'Google Sheets', image: require('../images/google_sheets.png'), color: '#333366', key: '4'},
            { name: 'Google Calendar', image: require('../images/google_calendar.png'), color: '#0066FF', key: '5'},
            { name: 'Webhooks', image: require('../images/webhooks.png'), color: '#0099FF', key: '6'},
            { name: 'Office 365 Mail', image: require('../images/ofice_365_mail.png'), color: '#0066CC', key: '7'},
        ];
        this.actions = [];
        this.reactions = [];
    }

    state = {
        isActionSelectionned:false,
        isReactionSelectionned:false,
        isReactionServiceSelectionned:false,
        test:false,
        url: ""
    }

    servicesActionClicked = (id) => {
        this.actions = [];
        this.setState({test:false})
        switch(id) {
            case '1':
                console.log("Service Intra Epitech");
                this.actions.push({ name: 'A project P is to be completed in less than X days', color: '#006ab3', key: '1'});
                this.actions.push({ name: 'There is X spots left on S slot', color: '#006ab3', key: '2'});
                this.actions.push({ name: 'A note from a P project is available', color: '#006ab3', key: '3'});
                break;
            case '2':
                console.log("Service Twitter");
                this.actions.push({ name: 'A new private message is received by the user U', color: '#0099CC', key: '1'});
                this.actions.push({ name: 'The user gains a follower', color: '#0099CC', key: '2'});
                this.actions.push({ name: 'New tweet from search', color: '#0099CC', key: '3'});
                break;
            case '3':
                console.log("Service OneDrive");
                this.actions.push({ name: 'A new file is present in the X directory', color: '#0066CC', key: '1'});
                this.actions.push({ name: 'A user shares a file', color: '#0066CC', key: '2'});
                break;
            case '4':
                // Axios.get(`http://10.0.2.2:8080/reddit/auth/reddit`).then((response) => {
                //     if (response.status == 200) {
                //         this.setState({url:response.request.responseURL});
                //         this.setState({test:true});
                //         console.log("" + this.state.url + ", "+ this.state.test);
                //     } else {
                //         console.error("Error Authentification Reddit");
                //     }
                // }).catch(function(error) {
                //         console.log(error);
                // });
                console.log("Service Reddit");
                this.actions.push({ name: 'If new hot post in R reddit', color: '#FF5700', key: '1'});
                this.actions.push({ name: 'If new comment by you', color: '#FF5700', key: '2'});
                break;
            case '5':
                console.log("Service Google Drive");
                this.actions.push({ name: 'If a new file is added in your folder', color: '#333366', key: '1'});
                break;
            case '6':
                console.log("Service Météo");
                this.actions.push({ name: 'If the T temperature falls under D degrees in X days at L location', color: '#0099CC', key: '1'});
                this.actions.push({ name: 'If it will be rain in X days at L location', color: '#0099CC', key: '2'});
                break;
            case '7':
                console.log("Service Twitch");
                this.actions.push({ name: 'If a streamer S launches a stream', color: '#663399', key: '1'});
                break;
            case '8':
                console.log("Service Youtube");
                // Axios.get(`http://10.0.2.2:8080/youtube/auth/google`).then((response) => {
                //     if (response.status == 200) {
                //         this.setState({url:response.request.responseURL});
                //         console.log(this.state.url);
                //     } else {
                //         console.error("Error Authentification Youtube");
                //     }
                // }).catch(function(error) {
                //         console.log(error);
                // });
                // this.openLink("https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl&response_type=code&client_id=964185218071-ml829eh6ghse9bqfbt2058mibvlevj2t.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob");
                this.actions.push({ name: 'If new liked video', color: 'red', key: '1'});
                this.actions.push({ name: 'If new video uploaded by U user', color: 'red', key: '2'});
                break;
            case '9':
                console.log("Service Google Calendar");
                this.actions.push({ name: 'If new event added', color: '#0066FF', key: '1'});
                this.actions.push({ name: 'If any event is planned in X days', color: '#0066FF', key: '2'});
                break;
        }
        console.log(this.actions);
        this.setState({isActionSelectionned:true})
    }

    servicesReactionClicked = (id) => {
        this.reactions = [];
        switch(id) {
            case '1':
                console.log("Service Intra Epitech");
                this.reactions.push({ name: 'The user signs up for an activity A', color: '#006ab3', key: '1'});
                break;
            case '2':
                console.log("Service Twitter");
                this.reactions.push({ name: 'Update biography', color: '#0099CC', key: '1'});
                this.reactions.push({ name: 'Post a tweet', color: '#0099CC', key: '2'});
                this.reactions.push({ name: 'Update profile picture', color: '#0099CC', key: '3'});
                break;
            case '3':
                console.log("Service Reddit");
                this.reactions.push({ name: 'If new hot post in R reddit', color: '#FF5700', key: '1'});
                break;
            case '4':
                console.log("Service Google Sheets");
                this.reactions.push({ name: 'Save X in a spreadsheet S', color: '#333366', key: '1'});
                break;
            case '5':
                console.log("Service Google Calendar");
                this.actions.push({ name: 'Add an event', color: '#0066FF', key: '1'});
                break;
            case '6':
                console.log("Service Webhooks");
                this.reactions.push({ name: 'Make a web request', color: '#0099FF', key: '1'});
                break;
            case '7':
                console.log("Service Office 365 Mail");
                this.reactions.push({ name: 'Send email', color: '#0066CC', key: '1'});
                break;
        }
        console.log(this.reactions);
        this.setState({isReactionSelectionned:true})
    }

    render() {
        
        const servicesActions = 
        <View>
            <View>
                <Text style={{...styles.title}}>Select a service</Text>
            </View>
            <ScrollView style={{overflow: 'scroll'}}>
                { this.servicesActions.map(item => (
                    <View key={item.key}>
                        <TouchableOpacity onPress={() => this.servicesActionClicked(item.key)}>
                            <View style={{...styles.item, backgroundColor: item.color}}>
                                <Image style={{ marginRight: 'auto', marginLeft: 'auto',}} source={item.image}/>
                                <Text style={{...styles.textList}}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>;

        const LoginWebView = 
        <WebView
        style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}
        ref={(ref) => { this.webview = ref; }}
        source={{uri: this.state.url }}
        />

        const actions =
        <View>
            <View>
                <Icon onPress={() => this.setState({isActionSelectionned:false})} style={{marginLeft: 10}} size={30} name={'ios-arrow-back-outline'} />
                <Text style={{...styles.title}}>Select an action</Text>
            </View>
            <ScrollView>
                { this.actions.map(item => (
                    <View key={item.key}>
                        <TouchableOpacity onPress={() => this.setState({isReactionServiceSelectionned:true})}>
                            <View style={{...styles.item, backgroundColor: item.color}}>
                                <Text style={{...styles.textList}}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>;

        const servicesReactions = 
        <View>
            <View>
                <Icon onPress={() => this.setState({isReactionServiceSelectionned:false})} style={{marginLeft: 10}} size={30} name={'ios-arrow-back-outline'} />
                <Text style={{...styles.title}}>Select a service</Text>
            </View>
            <ScrollView>
                { this.servicesReactions.map(item => (
                    <View key={item.key}>
                        <TouchableOpacity onPress={() => this.servicesReactionClicked(item.key)}>
                            <View style={{...styles.item, backgroundColor: item.color}}>
                                <Image style={{ marginRight: 'auto', marginLeft: 'auto',}} source={item.image}/>
                                <Text style={{...styles.textList}}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>;

        const reactions =
        <View>
            <View>
                <Icon onPress={() => this.setState({isReactionSelectionned:false})} style={{marginLeft: 10}} size={30} name={'ios-arrow-back-outline'} />
                <Text style={{...styles.title}}>Select a reaction</Text>
            </View>
            <ScrollView>
                { this.reactions.map(item => (
                    <View key={item.key}>
                        <TouchableOpacity>
                            <View style={{...styles.item, backgroundColor: item.color}}>
                                <Text style={{...styles.textList}}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>;

        let visual;

        if (this.state.isActionSelectionned === false && this.state.isReactionSelectionned === false && this.state.isReactionServiceSelectionned === false)
            visual = servicesActions;
        else if (this.state.isActionSelectionned === true && this.state.isReactionServiceSelectionned === false && this.state.isReactionSelectionned === false) {
            // if (this.state.test === true)
            //     visual = LoginWebView;
            // else
                visual = actions;
        } else if (this.state.isActionSelectionned === true && this.state.isReactionServiceSelectionned === true && this.state.isReactionSelectionned === false)
            visual = servicesReactions;
        else
            visual = reactions;

        return (
            <View style={{...styles.homeContainer}}>
                {
                    visual
                }
            </View>
        );
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    isDisconnected = () => {
        Axios.get(`http://10.0.2.2:8080/logout`).then((response) => {
            if (response.status == 200) {
                console.log("Logout Successfull.");
                this.props.navigation.navigate("Login");
            } else {
                console.error("Logout.js : Error with the logout request response: wrong reponse status.");
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        return (
            <View style={{...styles.container}}>
                <View>
                    <Text>Profile Screen</Text>
                </View>
                <View
                onStartShouldSetResponder={() => this.isDisconnected()}
                style={{...styles.Logout}}>
                    <Text
                    style={{
                        color:"white",
                        fontFamily:"SemiBold"
                    }}>Logout</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Logout: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#3699d5",
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 23,
        bottom: 0,
        position: 'absolute',
        marginBottom: '5%'
    },
    homeContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    item: {
        marginTop: 24,
        padding: 90,
        fontSize: 24,
        borderRadius: 23,
        marginBottom: 5
    },
    textList: {
        color:"white",
        fontFamily:"SemiBold",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 20,
        marginTop: 0
    },
    title: {
        color:"black",
        fontFamily:"SemiBold",
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 30,
    }
});

const tabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={24} name={'ios-home'} />
                    </View>
                )
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={24} name={'ios-person'} />
                    </View>
                ),
                activeColor: '#ffffff',
                inactiveColor: '#3e2465',
                barStyle: { backgroundColor: '#c6303a' }
            }
        }
    },
    {
        initialRouteName: 'Home',
        activeColor: '#ffffff',
        inactiveColor: '#3e2465',
        barStyle: { backgroundColor: '#3699d5' }
    }
);

export default createAppContainer(tabNavigator);
import React, { Component } from 'react';
import {
  Container, Header, Content, Footer, Input, Button, Item, Icon,
  Card, CardItem, Left, Right, Thumbnail, Body, View, List, ListItem
} from 'native-base'
import { Text, Image } from 'react-native'
import axios from 'axios'
export default class App extends Component {
  state = {
    cari: '',
    hasil: []
  }
  cari = () => {
    let url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.cari}`
    let config = { headers: { 'user-key': '2838670ce27f021697f936d0c016e163' } }
    axios.get(url, config).then((info) => {
      this.setState({
        hasil: info.data.restaurants
      })
    })
  }

  render() {

    let pecah = this.state.hasil.map((val, i) => {
      let nama = val.restaurant.name
      let kota = val.restaurant.location.city
      let alamat = val.restaurant.location.address
      let harga = val.restaurant.average_cost_for_two * 198
      let gambar = val.restaurant.thumb
      let gambar2 = 'http://www.devsanon.com/wp-content/uploads/2015/12/null.png'
      return (
        <Card key={i} style={{paddingBottom:5}} bordered>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: gambar? gambar : gambar2 }} />
              <Body>
                <Text>{nama}</Text>
                <Text note>{kota}</Text>
              </Body>
            </Left>
            <Right>
              <Text>Rp.{harga}</Text>
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: gambar? gambar : gambar2 }} style={{ height: 200, width: null, flex: 1 }} />
          </CardItem>
          <CardItem>
            <Left>
              <Icon name="pin" />
              <Text>{alamat}</Text>
            </Left>
          </CardItem>
          </Card>
      )
    })

    return (
      <React.Fragment>
        <Container>
          <Header searchBar rounded style={{ backgroundColor: 'red', opacity: 10 }}>
            <Item>
              <Icon name="search" />
              <Input
                placeholder="Cari makanan favoritmu"
                onChangeText={(e) => { this.setState({ nama: e }) }}
              />
            </Item>
          </Header>
          <Content>
            <Button full onPress={this.cari} style={{ backgroundColor: 'red' }}>
              <Text>LIHAT DAFTAR RESTO</Text>
            </Button>
            <View>
              {pecah}
            </View>
          </Content>
          <Footer></Footer>
        </Container>
      </React.Fragment>
    )
  }
}

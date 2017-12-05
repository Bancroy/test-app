import React, { Component } from 'react';
import { connect } from 'react-redux';

import {addProduct, deleteProduct} from './actions/products';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

export const SAVED_DATA_KEY = 'products';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyEditing: {},
    };

    this.deleteProduct = this.deleteProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.addRow = this.addRow.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveEditedProduct = this.saveEditedProduct.bind(this);
  }

  componentWillMount() {
    // const savedData = localStorage.getItem(SAVED_DATA_KEY) || JSON.stringify([]);
    // const parsedData = JSON.parse(savedData);
    //
    // this.setState({products: parsedData});
  }

  deleteProduct(id) {
    this.props.deleteProduct(id);
  }

  addRow() {
    const floatPrice = parseFloat(this.newPrice.value);

    if (isNaN(floatPrice)) {
      alert('Invalid price!');
      return;
    }

    if (this.newName.value === '') {
      alert('Invalid name!');
      return;
    }

    if (this.newDesc.value === '' ) {
      alert('Invalid desc!');
      return;
    }

    // this.setState({
    //   products: this.props.list.concat([{
    //     id: this.nextId(),
    //     name: this.newName.value,
    //     desc: this.newDesc.value,
    //     price: floatPrice
    //   }]),
    // }, this.saveData);
    const newProduct = {
      id: this.nextId(),
      name: this.newName.value,
      desc: this.newDesc.value,
      price: floatPrice
    };

    this.props.addProduct(newProduct);

    this.newName.value = '';
    this.newDesc.value = '';
    this.newPrice.value = '';
  }

  saveEditedProduct() {
    const clonedArray = this.props.list.slice(0);

    const editedProduct = clonedArray.find(item => item.id === this.state.currentlyEditing.id);
    Object.assign(editedProduct, {
      name: this.newNameEdit.value,
      desc: this.newDescEdit.value,
      price: parseFloat(this.newPriceEdit.value)
    });

    this.setState({
      currentlyEditing: {},
      products: clonedArray,
    }, this.saveData);
  }

  editProduct(id) {
    this.setState({
      currentlyEditing: Object.assign({}, this.props.list.find(product => product.id === id)),
    });
  }

  saveData() {
    const newData = JSON.stringify(this.props.list);
    localStorage.setItem(SAVED_DATA_KEY, newData);
  }

  restoreArray() {

  }

  nextId() {
    const idsList = this.props.list.map(index => index.id);

    if (this.props.list.length === 0) {
      return 1;
    } else {
      return Math.max.apply(null, idsList) + 1;
    }
  }

  showAlert(e) {
    console.log(e.target.tagName);
  }

  render() {
    return (
      <div className="container">
        <table className="table table-stripped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Desc</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          </thead>

          <tbody>
          {this.props.list.map((item) => (
            item.id === this.state.currentlyEditing.id ?
              <tr key={item.id} onClick={this.showAlert}>
                <td>{this.state.currentlyEditing.id}</td>
                <td>
                  <input defaultValue={this.state.currentlyEditing.name} ref={(newName) => { this.newNameEdit = newName }} name="newName" type="text" placeholder="Name..."/>
                </td>
                <td>
                  <input defaultValue={this.state.currentlyEditing.desc} ref={(newDesc) => { this.newDescEdit = newDesc }} required placeholder="Description..."/>
                </td>
                <td>
                  <input defaultValue={this.state.currentlyEditing.price} ref={(newPrice) => { this.newPriceEdit = newPrice }} type="number" step="0.01" min={0} placeholder="Price..."/>
                </td>
                <td>
                  <button type="submit" className="btn btn-success btn-xs" onClick={this.saveEditedProduct}>
                    Save
                  </button>
                  <button type="submit" className="btn btn-success btn-xs" onClick={this.saveEditedProduct}>
                    Cancel
                  </button>
                </td>
              </tr>
              :
              <tr key={item.id} onClick={this.showAlert}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.price}</td>
                <td>
                  <button className="btn btn-info btn-xs" onClick={() => this.editProduct(item.id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-xs" onClick={() => this.deleteProduct(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
          ))}

          <tr>
            <td>{this.nextId()}</td>
            <td><input ref={(newName) => { this.newName = newName }} name="newName" type="text" placeholder="Name..."/></td>
            <td><input ref={(newDesc) => { this.newDesc = newDesc }} required placeholder="Description..."/></td>
            <td><input ref={(newPrice) => { this.newPrice = newPrice }} type="number" step="0.01" min={0} placeholder="Price..."/></td>
            <td>
              <button type="submit" className="btn btn-success btn-xs" onClick={this.addRow}>
                Add
              </button>
            </td>
          </tr>

          <tr>
            <td>
              <button className="btn btn-info" onClick={this.restoreArray}>
                Restore
              </button>
            </td>
            <td>
              Products: {this.props.list.length}
            </td>
            <td>
              Total cost: {this.props.list.reduce((total,num) => total + num.price,0).toFixed(2)}
            </td>
            <td>
              Average cost: {((this.props.list.reduce((total,num) => total + num.price,0)) / this.props.list.length).toFixed(2)}
            </td>
            <td>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    );

  }
}

const mapStateToProps = (state) => ({
  list: state.products.list,
});

const mapDispatchToProps = {
  addProduct,
  deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

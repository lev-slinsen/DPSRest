import React, {Component} from 'react';
import style from './Catalog.module.css';
import PizzaCard from "../PizzaItem/PizzaItem";
import {compose} from "redux";
import {connect} from "react-redux";
import {addPizzaToOrder, calculateOrder} from "../../Redux/pizzasReducer";
import bgPict from "./../../assets/images/slide1.png"
import PopupWrapper from "../../common/PopupWrapper";
import {IFilterItem, IPizzaItem} from "../../types/types";
import {AppStateType} from "../../Redux/Store";


interface IConnectProps {
    pizzas: Array<IPizzaItem>,
    filters: Array<IFilterItem>,
}

interface LinkDispatchProps {
    addPizzaToOrder: (pizzaItem: IPizzaItem, quantity: number) => void;
    calculateOrder: () => void;
}

interface IState {
    selectedFilter: string
    bgPict: string
    isPopupOpen: boolean
    popupPizza: IPizzaItem
}

class Catalog extends Component<IConnectProps & LinkDispatchProps> {

    state: IState = {
        selectedFilter: 'All',
        bgPict: bgPict,
        isPopupOpen: false,
        popupPizza: {
            filter: [{name: 'big'}],
            id: 123,
            name: "123",
            photo: "http://93.85.88.35/media/images/%D1%80%D1%8B%D0%B1%D0%BD%D1%8B%D0%B9.jpg",
            photo_thumbnail: "http://93.85.88.35/media/images/%D1%80%D1%8B%D0%B1%D0%BD%D1%8B%D0%B9.jpg",
            price: 22.00,
            size: 2,
            text_long: "ng",
            text_short: "da",
        },
    };

    setPopupOpen = (pizza: IPizzaItem, option: boolean) => {
        this.setState({popupPizza: pizza});
        this.setState({isPopupOpen: option});
    };
    changeFilter = (filterName: string) => {
        this.setState({selectedFilter: filterName})
    };

    render() {

        let pizzas = this.props.pizzas
            .filter(p => {
                if (this.state.selectedFilter !== 'All') {
                    return p.filter.some(f => f.name === this.state.selectedFilter);
                } else {
                    return true;
                }
            })
            .map(p => (
                <PizzaCard pizza={p}
                           openPopup={() => {
                               this.setPopupOpen(p, true)
                           }}
                           key={p.id}
                           calculateOrder={this.props.calculateOrder}
                           addPizzaToOrder={this.props.addPizzaToOrder}
                />
            ));

        let filters = this.props.filters
            .map(f => (
                <button
                    key={f.name}
                    className={style.filterBtn}
                    onClick={() => {
                        this.changeFilter(f.name)
                    }}
                >
                    {f.name}
                </button>
            ));

        return (
            <div>
                {this.state.isPopupOpen && <PopupWrapper pizza={this.state.popupPizza}
                                                         setPopupOpen={this.setPopupOpen}
                />}
                <div>
                    <div>
                        <div style={{
                            backgroundImage: `url(${this.state.bgPict})`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            height: `35rem`,
                            backgroundSize: 'cover',
                        }}
                             className={style.caruselContent}>
                            <h3>
                                Carusel Title
                            </h3>
                        </div>
                        <div className={style.container}>{filters}</div>
                    </div>
                    <hr/>
                    <div className={style.pizzasContainer}>
                        {pizzas}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): IConnectProps => {
    return {
        pizzas: state.reducer.pizzas,
        filters: state.reducer.filters,
    }
};
export default compose(
    connect(mapStateToProps, {addPizzaToOrder, calculateOrder})
)(Catalog);

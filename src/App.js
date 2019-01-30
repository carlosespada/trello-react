import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function TopAppBar(props) {
  let styles = {
	  root: {
	    flexGrow: 1
	  }
	};
  return (
    <div styles={styles.root}>
      <AppBar position="fixed">
        <Toolbar>
	        <Grid container justify="space-between">
						<Grid item>
							<Typography variant="h5" color="inherit">
		            Trello Newtral
		          </Typography>
						</Grid>
						<Grid item>
							<Button color="inherit" title="Add a new column" onClick={props.addColumn}>
								Add column
							</Button>
						</Grid>
					</Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function DialogColumn(props) {
	return (
  	<Dialog open={props.isShowedDialogColumn} onClose={props.hideDialogColumn} aria-labelledby="form-dialog-column">
      <DialogTitle id="form-dialog-column">Enter the name of the column</DialogTitle>
      <DialogContent>
      	{ props.isShowedErrorColumn &&
      	<DialogContentText color="secondary">
          Please fill the name to send data.
        </DialogContentText>
        }
        <TextField
          autoFocus
          margin="dense"
          type="text"
          name="name"
          label="Name"
          value={props.name}
          onChange={props.handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.hideDialogColumn} color="secondary" title="Cancel this action and close the window">
          Cancel
        </Button>
        <Button onClick={props.createColumn} color="primary" title="Create a new column">
          Create column
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DialogCard(props) {
	let title;
	let button;
	if (props.action === 'create') {
    title = 'Enter the card info';
    button = <Button onClick={props.createCard} color="primary" title="Create a new card">Create card</Button>;
  } else if (props.action === 'edit') {
    title = 'Edit the card info';
    button = <Button onClick={props.saveCard} color="primary" title="Save card with new info">Save card</Button>;
  } else if (props.action === 'delete') {
    title = 'Delete card';
    button = <Button onClick={props.removeCard} color="primary" title="Delete this card">Delete card</Button>;
  }
  return (
		<Dialog open={props.isShowedDialogCard} onClose={props.hideDialogCard} aria-labelledby="form-dialog-card">
  		<DialogTitle id="form-dialog-card">{title}</DialogTitle>
  		{ (props.action === 'delete') ? (
  		<DialogContent>
  			<DialogContentText>
          Are you sure you want to delete this card?
        </DialogContentText>
      </DialogContent>
      ) : (
     	<DialogContent>
      	{ props.isShowedErrorCard &&
      	<DialogContentText color="secondary">
          Please fill all fields to send data.
        </DialogContentText>
        }
        <TextField
          autoFocus
          margin="dense"
          type="text"
          name="title"
          label="Title"
          value={props.title}
          onChange={props.handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="description"
          type="text"
          label="Description"
          value={props.description}
          onChange={props.handleChange}
          fullWidth
          multiline
        />
      </DialogContent>
      )}
      <DialogActions>
        <Button onClick={props.hideDialogCard} color="secondary" title="Cancel this action and close the window">
          Cancel
        </Button>
        { button }
      </DialogActions>
    </Dialog>
  );
}

function CardItem(props) {
	let styles = {
	  card: {
	    maxWidth: '100%',
	    marginBottom: 12
	  }
	};
	return (
		<div style={styles.card}>
			<Card>
	      <CardContent>
	        <Typography gutterBottom variant="h6" component="h3">
	          {props.card.title}
	        </Typography>
	        <Typography component="p">
	          {props.card.description}
	        </Typography>
	      </CardContent>
	      <CardActions>
	        <Button size="small" color="secondary" title="Delete this card" onClick={props.deleteCard}>
	          Delete
	        </Button>
	        <Button size="small" color="primary" title="Edit this card" onClick={props.editCard}>
	          Edit
	        </Button>
	      </CardActions>
	    </Card>
	  </div>
	)
}

function Column(props) {
	let styles = {
	  root: {
	  	padding: 12,
	  	border: '6px #fff solid',
	  	backgroundColor: '#f0f0f0'
	  }
	};
	return (
		<Grid item xs={12} sm={6} md={4} lg={3} xl={2} style={styles.root}>
			<Typography gutterBottom variant="h6" component="h2">
        {props.title}
      </Typography>
			{ props.cards.length > 0 &&
				props.cards.map((item, index) => 
					<CardItem key={index} card={item} indexColumn={props.indexColumn} indexCard={index} deleteCard={() => props.deleteCard(props.indexColumn, index)} editCard={() => props.editCard(props.indexColumn, index)} />
				)
			}
			<Grid container justify="center">
				<Grid item>
					<Button color="primary" variant="contained" title="Add a new card" onClick={props.addCard}>
						Add card
					</Button>
				</Grid>
			</Grid>
		</Grid>
	) 
}

function ColumnList(props) {
	let styles = {
	  root: {
	  	flexGrow: 1,
	  	padding: 6,
	  	marginTop: 72,
	  }
	};
	return (
		<Grid container style={styles.root}>
			{
				props.data.map((item, index) => 
					<Column key={index} title={item.title} cards={item.cards} indexColumn={index} addCard={() => props.addCard(index)} deleteCard={props.deleteCard} editCard={props.editCard} />
				)
			}
		</Grid>
	) 
}

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					title: 'Columna de ejemplo',
					cards: [{ title: 'Título de ejemplo', description: 'Descripción de ejemplo' }]
				}
			],
			name: '',
			title: '',
			description: '',
			action: null,
			activeColumn: null,
			activeCard: null,
			isShowedDialogColumn: false,
			isShowedErrorColumn: false,
			isShowedDialogCard: false,
			isShowedErrorCard: false,
			isShowedDialogDelete: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.addColumn = this.addColumn.bind(this);
		this.createColumn = this.createColumn.bind(this);
		this.hideDialogColumn = this.hideDialogColumn.bind(this);
		this.hideDialogCard = this.hideDialogCard.bind(this);
		this.addCard = this.addCard.bind(this);
		this.createCard = this.createCard.bind(this);
		this.deleteCard = this.deleteCard.bind(this);
		this.removeCard = this.removeCard.bind(this);
		this.editCard = this.editCard.bind(this);
		this.saveCard = this.saveCard.bind(this);
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	addColumn() {
		this.setState(prevState => ({
			isShowedDialogColumn: true
    }));
	}

	createColumn() {
		if (this.state.name !== '') {
			let dataCopy = this.state.data;
			dataCopy.push({'title': this.state.name, 'cards': []});
			this.setState({data: dataCopy, name: '', isShowedDialogColumn: false, isShowedErrorColumn: false});
		} else {
			this.setState(prevState => ({
				isShowedErrorColumn: true
	    }));
		}		
	}

	hideDialogColumn() {
		this.setState(prevState => ({
      isShowedDialogColumn: false,
      isShowedErrorColumn: false,
      name: ''
    }));
	}

	addCard(index) {
		this.setState(prevState => ({
			action: 'create',
			activeColumn: index,
			isShowedDialogCard: true
    }));
	}

	createCard() {
		if ((this.state.title !== '') && (this.state.description !== '')) {
			let dataCopy = this.state.data;
      dataCopy[this.state.activeColumn].cards.push({'title': this.state.title, 'description': this.state.description})
      this.setState({data: dataCopy, title: '', description: '', isShowedDialogCard: false, isShowedErrorCard: false});
		} else {
			this.setState(prevState => ({
				isShowedErrorCard: true
	    }));
		}
	}

	deleteCard(indexColumn, indexCard) {
		this.setState(prevState => ({
			activeColumn: indexColumn,
			activeCard: indexCard,
			action: 'delete',
			isShowedDialogCard: true
    }));
	}

	removeCard() {
		let dataCopy = this.state.data;
    dataCopy[this.state.activeColumn].cards.splice(this.state.activeCard, 1);
    this.setState({data: dataCopy, isShowedDialogCard: false});
	}

	editCard(indexColumn, indexCard) {
		this.setState(prevState => ({
			activeColumn: indexColumn,
			activeCard: indexCard,
			action: 'edit',
			title: this.state.data[indexColumn].cards[indexCard].title,
			description: this.state.data[indexColumn].cards[indexCard].description,
			isShowedDialogCard: true
    }));
	}

	saveCard() {
		if ((this.state.title !== '') && (this.state.description !== '')) {
			let dataCopy = this.state.data;
      dataCopy[this.state.activeColumn].cards[this.state.activeCard] = {'title': this.state.title, 'description': this.state.description};
      this.setState({data: dataCopy, title: '', description: '', isShowedDialogCard: false, isShowedErrorCard: false});
		} else {
			this.setState(prevState => ({
				isShowedErrorCard: true
	    }));
		}
	}

	hideDialogCard() {
		this.setState(prevState => ({
      isShowedDialogCard: false,
      isShowedErrorCard: false,
      title: '',
      description: ''
    }));
	}

	render() {
		return (
			<div id="wrapper">
				<TopAppBar
					addColumn={this.addColumn}
				/>
				<ColumnList
					data={this.state.data}
					addCard={this.addCard}
					deleteCard={this.deleteCard}
					editCard={this.editCard}
				/>
				<DialogColumn
					isShowedDialogColumn={this.state.isShowedDialogColumn}
					isShowedErrorColumn={this.state.isShowedErrorColumn}
					createColumn={this.createColumn}
					hideDialogColumn={this.hideDialogColumn}
					handleChange={this.handleChange}
					name={this.state.name}
				/>
				<DialogCard
					isShowedDialogCard={this.state.isShowedDialogCard}
					isShowedErrorCard={this.state.isShowedErrorCard}
					createCard={this.createCard}
					removeCard={this.removeCard}
					saveCard={this.saveCard}
					hideDialogCard={this.hideDialogCard}
					handleChange={this.handleChange}
					title={this.state.title}
					description={this.state.description}
					action={this.state.action}
				/>
			</div>
		)
	}

}

export default App;
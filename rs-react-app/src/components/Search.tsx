import { Component, type ChangeEvent } from 'react';

interface Props {
  onSearch: (searchTerm: string) => void;
}

interface State {
  inputValue: string;
}

class Search extends Component<Props, State> {
  // We store this outside of state because changing it shouldn't trigger a re-render
  private lastSearchedTerm: string = '';

  constructor(props: Props) {
    super(props);
    this.state = { inputValue: '' };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    if (savedTerm) {
      this.setState({ inputValue: savedTerm });
      this.lastSearchedTerm = savedTerm; // Sync our tracker with local storage
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = () => {
    const trimmedTerm = this.state.inputValue.trim(); // Feature 5: Remove extra spaces
    
    // Feature 5 & 6: If text hasn't changed, do NOTHING.
    if (trimmedTerm === this.lastSearchedTerm) {
      return; 
    }

    // If it has changed, save it, update our tracker, and fetch data
    localStorage.setItem('searchTerm', trimmedTerm);
    this.lastSearchedTerm = trimmedTerm;
    this.props.onSearch(trimmedTerm);
  };

  render() {
    return (
      <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #333', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Top controls</h3>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="Search Star Wars characters..."
          style={{ padding: '8px', marginRight: '10px', width: '250px' }}
        />
        <button onClick={this.handleSearch} style={{ padding: '8px 16px' }}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
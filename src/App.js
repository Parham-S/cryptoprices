import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import coinYoda from "./coinyoda.png";
import logo from "./logo.png";

function App() {
	// Setting up the inital states using react hook 'useState'
	const [search, setSearch] = useState("");
	const [crypto, setCrypto] = useState([]);

	// Fetching coin data from api only once when the component is mounted
	useEffect(() => {
		Axios.get(
			"https://api.coinstats.app/public/v1/coins?skip=0&limit=100"
		).then((res) => {
			setCrypto(res.data.coins);
		});
	}, []);

	return (
    <div className='App'>
         <a href='https://github.com/Parham-S/cryptoprices'><img src={logo} alt="Logo" /></a>
			<h1>CoinYoda</h1>
			<img src={coinYoda} alt='yoda' />

			<input
				type='text'
				placeholder='Search...'
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
			<table>
				<thead>
					<tr>
						<td>Rank</td>
						<td>Name</td>
						<td>Symbol</td>
						<td>Price</td>
						<td>Available Supply</td>
						<td>Volume(24hrs)</td>
					</tr>
				</thead>
				<tbody>
					{crypto
						.filter((val) => {
							return val.name.toLowerCase().includes(search.toLowerCase());
						})
						.map((val, id) => {
							return (
								<>
									<tr id={id}>
										<td className='rank'>{val.rank}</td>
										<td className='logo'>
											<a href={val.websiteUrl}>
												<img src={val.icon} alt='logo' width='30px' />
											</a>
											<p>{val.name}</p>
										</td>
										<td className='symbol'>{val.symbol}</td>
										<td>${val.price.toFixed(2)}</td>
										<td>{val.availableSupply.toFixed(0)}</td>
										<td>{val.volume.toFixed(0)}</td>
									</tr>
								</>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

export default App;

export default function ProposalsIndex() {
	return (
		<div className="flex-1 flex flex-col py-5 px-10">
			<h1 className="font-flex text-3xl mb-7">
				Community Governance Proposals (CGP)
			</h1>
			<ul className="flex space-x-10 font-flex text-lg mb-3">
				<li>All</li>
				<li>Active</li>
				<li>Passed</li>
				<li>Rejected</li>
			</ul>
			<table className="table-fixed">
				<tbody>
					<tr className="bg-neutral-300">
						<td className="py-5">Placeholder</td>
					</tr>
					<tr className="bg-neutral-100">
						<td className="py-5">Placeholder</td>
					</tr>
					<tr className="bg-neutral-300">
						<td className="py-5">Placeholder</td>
					</tr>
					<tr className="bg-neutral-100">
						<td className="py-5">Placeholder</td>
					</tr>
					<tr className="bg-neutral-300">
						<td className="py-5">Placeholder</td>
					</tr>
					<tr className="bg-neutral-100">
						<td className="py-5">Placeholder</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

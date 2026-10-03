import Layout from "../components/Layout"

const HomePage = () =>{
     return  (
        <>
            <Layout>
                <div className="container mt-4">
                    <h1 className="display-4 text-center">Welcome to Personal Expense Tracker</h1>
                    <p className="lead text-center">Track your expenses and manage your finances effectively.</p>
                </div>
            </Layout>
        </>
     )
}

export default HomePage
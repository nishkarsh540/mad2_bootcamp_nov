<template>
    <div>
        <h2>Manageer Managing</h2>
        <table v-if="pendingManagers.length>0">
            <thead>
                <tr>
                    <th>username</th>
                    <th>Action</th>
                </tr>
                <tbody>
                    <tr v-for="manager in pendingManagers" :key="manager.id">
                        <td>{{ manager.username }}</td>
                        <td>
                            <button @click="confirmApproval(manager)">
                                Approve
                            </button>
                            <button @click="confirmRejection(manager)">
                                    Reject
                            </button>
                        </td>
                    </tr>
                </tbody>
            </thead>
        </table>
        <p v-else>No NEW MANAGERS</p>

        <div v-if="showConfirmationModel">
            <div>
                <h2>{{ confirmationTitle }}</h2>
                <p>{{ confirmationMessage }}</p>
                <div>
                    <button @click="handleConfirmation(true)">Confirm</button>
                    <button @click="handleConfirmation(false)">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <div>
        <canvas ref="myChart"></canvas>
    </div>
</template>


<script>
import axios from 'axios';
import {Chart} from 'chart.js';
import {Chart as ChartJS,Title,Tooltip,Legend,BarElement,BarController,CategoryScale,LinearScale} from 'chart.js';


ChartJS.register(Title,Tooltip,Legend,BarElement,BarController,CategoryScale,LinearScale);


export default{
    data(){
        return{
            username:JSON.parse(localStorage.getItem('user')).username,
            user_id :JSON.parse(localStorage.getItem('user')).id,
            pendingManagers:[],
            showConfirmationModel:false,
            confirmationTitle:'',
            pendingManagerToHandle:null,
            chartData:{
                labels:[],
                datasets:[
                    {
                        label: 'Number of Users',
                        backgroundColor: '#42A5F5',
                        data:[],
                    }
                ]
            },
            chartInstance:null
        }
    },
    mounted(){
        this.fetchUserCounts();
    },
    created(){
        this.fetchPendingManagers();
    },
    methods:{
        async fetchUserCounts(){
            try{
                const response = await axios.get('/stat');
                const data=response.data;
                this.chartData.labels = Object.keys(data);
                this.chartData.datasets[0].data =Object.values(data);

                this.renderChart();
            } catch(error){
                console.log(error)
            }
        },
        renderChart(){
            if (this.$refs.myChart){
                if (this.chartInstance){
                    this.chartInstance.destroy();
                }
                this.chartInstance = new Chart(this.$refs.myChart.getContext('2d'),{
                    type: 'bar',
                    data:this.chartData,
                    options:{
                        responsive:true,
                        plugins:{
                            legend:{
                                display:true,
                                position:'top',
                            },
                        },
                        scales:{
                            x:{
                                title:{
                                    dispaly:true,
                                    text:'Categories',
                                }
                            }
                        }
                    }
                })
            } else {
                console.error('Chart canvas element not found')
            }
        },
        fetchPendingManagers(){
            const accessToken = localStorage.getItem('token');
            axios
                .get('/admin/pending_managers',{
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then((response) =>{
                    this.pendingManagers = response.data;
        })
        .catch((error)=>{
            console.error(error);
        })
    },
    handleManageraction(managerId,status){
        const accessToken = localStorage.getItem('token');
        const data={
            manager_id:managerId,
            status:status,
        };
        axios.post('/admin/pending_managers',data,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response)=>{
            this.fetchPendingManagers();
            this.$toast.success(response.data.message,{
                position:'top-right',
                duration: 5000, 
            })
        })
        .catch((error)=>{
            console.error(error)
        })
    },
    confirmApproval(manager){
        this.pendingManagerToHandle=manager;
        this.confirmationTitle='Approve Manager'
        this.confirmationMessage = `Approve ${manager.username}'s manager reqeust'`;
        this.showConfirmationModel=true;
    },
    confirmRejection(manager){
        this.pendingManagerToHandle=manager;
        this.confirmationTitle='Reject Manager'
        this.confirmationMessage = `Reject ${manager.username}'s manager reqeust'`;
        this.showConfirmationModel=true;
    },
    handleConfirmation(isConfirmed){
        if (isConfirmed){
            if(this.confirmationTitle =='Approve Manager'){
                this.handleManageraction(this.pendingManagerToHandle.id,'approve');
            } else {
                this.handleManageraction(this.pendingManagerToHandle.id,'reject')
            }
        }

        this.showConfirmationModel=false;
        this.confirmationTitle='',
        this.confirmationMessage='',
        this.pendingManagerToHandle=null;
    }
}
}
</script>
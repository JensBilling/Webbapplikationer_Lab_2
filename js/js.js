// Output component
Vue.component('listOutput', {
    props: ['pListElement'],
    template: `
    <ul id="listOutput">
        <li>
        <span>
        <p>{{ pListElement }}</p>
        <button class="outputButton" v-on:click="$emit('remove-item')">Delete</button>
        <button class="outputButton" v-on:click="$emit('increase-item')">Prio ^</button>
        <button class="outputButton" v-on:click="$emit('reduce-item')">Prio v</button></li>
        </span>
    </ul>
    `
})

// Vue app
new Vue({
    el: '#app',
    data: {
        companyName: '',
        newCompanyName: '',
        listObject: [
            {
                id: 1,
                task: 'iOS app',
                name: 'Jens',
                deadline: '2021-10-19',
                prio: 1,
                prioColor: 'darkred'
            },
            {
                id: 2,
                task: 'Android app',
                name: 'Jerry',
                deadline: '2021-10-19',
                prio: 2,
                prioColor: 'darkorange'
            },
            {
                id: 3,
                task: 'Debugging',
                name: 'Kalle',
                deadline: '2021-10-19',
                prio: 3,
                prioColor: 'darkgreen'
            }
        ],
        listItem: '',
        listName: '',
        listDeadline: '',
        allFieldsFilled: false,
        nextId: 4
    },
    methods: {
        addTaskToList() {
            if (this.listItem != '' && this.listName != '' && this.listDeadline != '') {

                let deadlineYear = this.listDeadline.substring(0, 4)
                let deadlineMonth = this.listDeadline.substring(5, 7)
                let deadlineDay = this.listDeadline.substr(8, 10)
                if (deadlineYear < 2000 ||
                    deadlineYear > 3000 ||
                    deadlineMonth < 1 ||
                    deadlineMonth > 12 ||
                    deadlineDay < 1 ||
                    deadlineDay > 31) {
                    alert('Make sure to enter date exactly: YYYY-MM-DD')
                } else {
                    this.listObject.push({
                        task: this.listItem,
                        name: this.listName,
                        deadline: this.listDeadline,
                        prio: 2,
                        prioColor: 'darkorange',
                        id: this.nextId
                    })
                    this.listItem = ''
                    this.listName = ''
                    this.listDeadline = ''
                    this.nextId++


                    for (let i = 0; i < this.listObject.length; i++) {
                    }
                }
            } else {
                alert('You need to fill all input fields')
            }
        },
        calculateDeadline(deadlineDate) {
            let finalDate = new Date(deadlineDate).getTime()
            let currentDate = new Date().getTime()
            let countdownDifference = finalDate - currentDate
            let daysLeft = Math.floor(countdownDifference / (1000 * 60 * 60 * 24));
            daysLeft++

            if (daysLeft > 1) {
                return 'Deadline: in ' + daysLeft + ' days'
            } else if (daysLeft == 1) {
                return 'Deadline: Tomorrow'
            } else if (daysLeft == 0) {
                return 'Deadline: Today'
            } else {
                return 'Deadline: was ' + daysLeft.toString().substring(1) + ' days ago'
            }

        },
        increasePrio(item) {
            if (item.prio == 1) {
                alert('This post is already prio 1 of 3')
            } else if (item.prio == 2) {
                item.prioColor = 'darkred'
                item.prio--
            } else {
                item.prioColor = 'darkorange'
                item.prio--
            }
        },
        reducePrio(item) {
            if (item.prio == 3) {
                alert('This post is already prio 3 of 3')
            } else if (item.prio == 1) {
                item.prioColor = 'darkorange'
                item.prio++
            } else {
                item.prioColor = 'darkgreen'
                item.prio++
            }
        },
        deleteItem(index) {
            this.listObject.splice(index, 1)
        },
        changeCompanyName(event){
            this.companyName = this.newCompanyName
            event.preventDefault()
        }
    }
})
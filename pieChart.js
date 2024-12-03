class PRPieChart {
    constructor() {
        const ctx = document.getElementById('prPieChart').getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['24h or less', '24-72h', 'More than 72h'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: [
                        '#4BC0C0',
                        '#FFCE56',
                        '#FF6384'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                return `${label}: ${value} tickets (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    update(durations) {
        const prReviews = durations
            .map(d => d['Pull Request Time'])
            .filter(pr => pr !== null)
            .map(pr => pr.value);

        const distribution = {
            fast: prReviews.filter(time => time <= 1).length,
            medium: prReviews.filter(time => time > 1 && time <= 3).length,
            slow: prReviews.filter(time => time > 3).length
        };

        this.chart.data.datasets[0].data = [
            distribution.fast,
            distribution.medium,
            distribution.slow
        ];

        this.chart.update();
    }
}
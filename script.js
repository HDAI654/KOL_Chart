let myChart;
const downloadBtn = document.getElementById('downloadBtn');

// function to draw the chart
function drawChart(){
  const labels = document.getElementById('labels').value.split(',');
  const values = document.getElementById('values').value.split(',').map(Number);
  const chartType = document.getElementById('chartType').value;

  // اگر نمودار قبلاً وجود داشت، اون رو پاک می‌کنیم
  if (myChart) {
    myChart.destroy();
  }

  // رسم نمودار جدید
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: chartType, // نوع نمودار
    data: {
      labels: labels,
      datasets: [{
        label: 'Dataset',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // نمایش دکمه دانلود
  downloadBtn.style.display = 'block';
}

// function to handle form submission
document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault();
  drawChart();
});


// function to handle download button click
downloadBtn.addEventListener('click', () => {
  const canvas = document.getElementById('myChart');
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'chart.png';
  link.click();
});


// function to handle chart type change
document.getElementById('chartType').addEventListener('change', function(event) {
  const newChartType = event.target.value;

  if (newChartType === 'bubble' || newChartType === 'scatter') {
    document.getElementById('labels').previousElementSibling.innerText = 'X-axis Data';
    document.getElementById('values').previousElementSibling.innerText = 'Y-axis Data';
    document.getElementById('labels').placeholder = 'example: 45, 67, 89';
    document.getElementById('values').placeholder = 'example: 10, 20, 30';
  } else {
    document.getElementById('labels').previousElementSibling.innerText = 'Labels (comma-separated)';
    document.getElementById('values').previousElementSibling.innerText = 'Values (comma-separated)';
    document.getElementById('labels').placeholder = 'example: January, February, March';
    document.getElementById('values').placeholder = 'example: 100, 200, 300';
  }
  if (myChart) {
    drawChart();
  }
});

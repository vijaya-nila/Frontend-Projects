const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    window.onload = () => {
      const savedTasks = JSON.parse(localStorage.getItem("collegeTasks")) || [];
      savedTasks.forEach(task => renderTask(task));
    };

    function addTask() {
      const title = document.getElementById("taskTitle").value.trim();
      const subject = document.getElementById("taskSubject").value.trim();
      const category = document.getElementById("taskCategory").value;
      const date = document.getElementById("taskDate").value;

      if (!title || !subject || !date) {
        alert("Please fill out all fields.");
        return;
      }

      const task = { title, subject, category, date };
      renderTask(task);
      saveTask(task);

      // Clear inputs
      document.getElementById("taskTitle").value = "";
      document.getElementById("taskSubject").value = "";
      document.getElementById("taskCategory").value = "Assignment";
      document.getElementById("taskDate").value = "";
    }

    function renderTask(task) {
      const li = document.createElement("li");

      const info = document.createElement("div");
      info.className = "task-info";
      info.innerHTML = `<strong>${task.title}</strong><br>
        Subject: ${task.subject}<br>
        Category: ${task.category}<br>
        Due: ${task.date}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => {
        li.remove();
        removeTask(task);
      };

      li.appendChild(info);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    }

    function saveTask(task) {
      const tasks = JSON.parse(localStorage.getItem("collegeTasks")) || [];
      tasks.push(task);
      localStorage.setItem("collegeTasks", JSON.stringify(tasks));
    }

    function removeTask(taskToRemove) {
      let tasks = JSON.parse(localStorage.getItem("collegeTasks")) || [];
      tasks = tasks.filter(task =>
        task.title !== taskToRemove.title ||
        task.subject !== taskToRemove.subject ||
        task.date !== taskToRemove.date
      );
      localStorage.setItem("collegeTasks", JSON.stringify(tasks));
    }
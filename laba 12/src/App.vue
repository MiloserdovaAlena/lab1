<template>
  <div class="app__wrapper">
    <h2 class="app__title">Страница комментариев</h2>
    <my-button @click="showDialog">Создать комментарий</my-button>

    <comment-list :comments="comments" @reply="showReplyDialog" />
    <div
      class="app__loading"
      :class="{ 'fade-out': !isPostLoading || comments.length > 0 }"
      v-if="isPostLoading && comments.length === 0"
    >
      <img src="../src/assets/loading.gif" alt="loading..." />
    </div>
    <my-dialog v-model:show="dialogVisible" @close="closeDialog">
      <comment-form @create="postComments" :parentCommentId="parentCommentId" />
    </my-dialog>
    <div v-if="errorModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h3>Ошибка</h3>
        <p>{{ errorMessage }}</p>
        <button @click="closeErrorModal">Закрыть</button>
      </div>
    </div>
    <div v-if="successModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h3>Успешно</h3>
        <p>Комментарий успешно отправлен.</p>
        <button @click="closeSuccessModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
import CommentForm from "./components/CommentForm.vue";
import CommentList from "./components/CommentList.vue";
import axios from "axios";
import MyButton from "./components/ui/MyButton.vue";

export default {
  components: {
    CommentForm,
    CommentList,
    MyButton,
  },
  data() {
    return {
      comments: [],
      dialogVisible: false,
      isPostLoading: true,
      evtSource: new EventSource("http://194.67.93.117:80/comments/stream"),
      errorModalVisible: false,
      successModalVisible: false,
      errorMessage: "",
    };
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get("http://194.67.93.117:80/comments");
        console.log(response);
        this.comments.length = 0;
        this.comments.push(...response.data.reverse());
        this.isPostLoading = false;
      } catch (e) {
        this.showErrorModal("Ошибка при загрузке комментариев.");
        this.isPostLoading = false;
      }
    },
    async postComments(comment) {
      try {
        let url = "http://194.67.93.117:80/comments";
        let commentbody = {
          author: comment.author,
          text: comment.text,
          reaction: comment.reaction,
          parentId: comment.parentId,
        };

        const response = await axios.post(url, commentbody, {
          headers: {
            "Content-Type": "application/json",
            Username: "MiloserdovaAlena",
          },
        });

        console.log(response.data);
        this.showSuccessModal();
        this.closeDialog();
      } catch (error) {
        this.showErrorModal("Не удалось создать комментарий.");
      }
    },
    ourEventSource() {
      this.evtSource.onmessage = this.addComment;
    },
    showReplyDialog(parentCommentId) {
      this.parentCommentId = parentCommentId;
      this.dialogVisible = true;
      document.body.classList.add("modal-open");
    },
    addComment(comment) {
      console.log(comment);
      this.comments.push(JSON.parse(comment.data));
    },
    showDialog() {
      this.dialogVisible = true;
      document.body.classList.add("modal-open");
    },
    closeDialog() {
      document.body.classList.remove("modal-open");
      this.dialogVisible = false;
    },
    showSuccessModal() {
      this.successModalVisible = true;
      setTimeout(() => {
        this.successModalVisible = false;
      }, 2000);
    },
    closeSuccessModal() {
      this.successModalVisible = false;
    },
    showErrorModal(errorMessage) {
      this.errorMessage = errorMessage;
      this.errorModalVisible = true;
    },
    closeErrorModal() {
      this.errorModalVisible = false;
    },
  },
  computed: {
    commentsLength() {
      return this.comments.length;
    },
  },
  beforeMount() {
    this.fetchComments();
  },
  mounted() {
    this.ourEventSource();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  word-break: break-word;
}

ul,
li {
  list-style: none;
}

.app__wrapper {
  max-width: 1170px;
  margin: auto;
  padding: 7px;
}

body {
  font-size: 20px;
  margin: 0 auto;
}

.app__title {
  margin-bottom: 10px;
}

.app__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  transition: opacity 0.5s;
}

.fade-out {
  opacity: 0;
}

.modal-content-wrapper {
  max-height: 80vh;
  overflow-y: auto;
}

.modal-open {
  overflow: hidden;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}

.modal-content h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.modal-content p {
  margin-bottom: 20px;
}

.modal-content button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #0056b3;
}
</style>

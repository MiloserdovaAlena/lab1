<template>
  <form class="form" @submit.prevent="createComment">
    <h2 class="form__title">Создание постов</h2>
    <label class="form__label form__label--text">
      <span class="form__label-text">Введите название</span>
      <my-input
        v-model.trim="formData.author"
        class="form__input form__input--focus"
        inputType="text"
        inputName="author"
        required
        placeholder="Название"
      />
    </label>
    <label class="form__label form__label--text">
      <span class="form__label-text">Введите комментарий</span>
      <my-input
        class="form__input"
        placeholder="Описание"
        v-model="formData.text"
        textareaName="text"
        required
      />
    </label>
    <fieldset class="form__fieldset">
      <legend class="form__legend">Реакция:</legend>
      <label class="form__label">
        <input
          v-model="formData.reaction"
          type="radio"
          name="reaction"
          value="1"
          class="form__radio visually-hidden"
          required
        />
        <span class="form__radio-icon">
          <svg
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2,22H18.644a3.036,3.036,0,0,0,3-2.459l1.305-7a2.962,2.962,0,0,0-.637-2.439A3.064,3.064,0,0,0,19.949,9H15.178V5c0-2.061-2.113-3-4.076-3a1,1,0,0,0-1,1c0,1.907-.34,3.91-.724,4.284L6.593,10H2a1,1,0,0,0-1,1V21A1,1,0,0,0,2,22ZM8,11.421l2.774-2.7c.930-.907,1.212-3.112,1.3-4.584.542.129,1.109.38,1.109.868v5a1,1,0,0,0,1,1h5.771a1.067,1.067,0,0,1,.824.38.958.958,0,0,1,.21.8l-1.3,7A1.036,1.036,0,0,1,18.644,20H8ZM3,12H6v8H3Z"
            />
          </svg>
        </span>
        <span class="visually-hidden">Нравится</span>
      </label>
      <label class="form__label">
        <input
          v-model="formData.reaction"
          type="radio"
          required
          name="reaction"
          value="0"
          class="form__radio visually-hidden"
          checked
        />
        <span class="form__radio-icon">
          <svg
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 36 36"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M24.05,22.06h-12a1,1,0,0,0,0,2h12a1,1,0,0,0,0-2Z"
              class="clr-i-outline clr-i-outline-path-1"
            ></path>
            <path
              d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"
              class="clr-i-outline clr-i-outline-path-2"
            ></path>
            <circle
              cx="25.16"
              cy="14.28"
              r="1.8"
              class="clr-i-outline clr-i-outline-path-3"
            ></circle>
            <circle
              cx="11.16"
              cy="14.28"
              r="1.8"
              class="clr-i-outline clr-i-outline-path-4"
            ></circle>
            <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
          </svg>
        </span>
        <span class="visually-hidden">Нейтрально</span>
      </label>
      <label class="form__label">
        <input
          v-model="formData.reaction"
          type="radio"
          name="reaction"
          value="-1"
          class="form__radio visually-hidden"
          required
        />
        <span class="form__radio-icon">
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 50.8 50.8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3.089"
              d="M44.45 9.525v21.431h-7.144V9.525zm-11.112 3.969s0-3.969-3.969-3.969H14.29c-1.588 0-3.037.845-3.97 3.175L6.902 22.953c-.354.819-.551 1.58-.551 2.454v3.962s0 3.175 3.175 3.175h11.113l-1.588 5.557c-.794 2.38-.794 3.175.794 4.762l1.587 1.588 11.113-11.112s.794-.794.794-2.382V13.495"
              style="paint-order: markers stroke fill"
              transform="matrix(1.0278 0 0 1.028 -.706 -2.342)"
            />
          </svg>
        </span>
        <span class="visually-hidden">Не нравится</span>
      </label>
    </fieldset>
    <my-button class="form__button">Создать</my-button>
  </form>
</template>

<script>
export default {
  props: {
    parentCommentId: {
      type: Number,
      defualt: null,
    },
  },
  data() {
    return {
      formData: {
        author: "",
        text: "",
        reaction: 0,
        parentId: null,
      },
    };
  },
  methods: {
    createComment() {
      this.formData = {
        author: this.formData.author,
        text: this.formData.text,
        reaction: +this.formData.reaction,
        parentId: this.parentCommentId,
      };
      this.$emit("create", this.formData);
      this.formData = {
        author: "",
        text: "",
        reaction: 0,
        parentId: null,
      };
    },
  },
};
</script>

<style scoped>
.form__label {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form__label-text {
  margin-left: 10px;
}

.form__input,
.form__textarea {
  padding: 12px;
  border: 2px solid #007bff;
  border-radius: 6px;
}

.form__textarea {
  resize: vertical;
}

.form__fieldset {
  padding: 15px;
  border: 2px solid #007bff;
  border-radius: 6px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form__legend {
  font-weight: bold;
  margin-bottom: 10px;
}

.form__button {
  align-self: center;
  margin-top: 30px;
  background-color: #007bff;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.form__button:hover {
  background-color: #0056b3;
}

.form__button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0 0 0 0);
}

svg {
  width: 40px;
  height: 40px;
  margin: 0;
}

.form__label--text {
  flex-direction: row;
}

.form__radio:checked + .form__radio-icon {
  border: 2px solid #007bff; /* Change border color to highlight */
  border-radius: 6px; /* Add border radius for rounded highlight */
}

.form__radio:focus ~ .form__radio-icon {
  outline: 2px solid black;
}
</style>

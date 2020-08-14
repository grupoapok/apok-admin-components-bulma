<template>
  <div class="upload-container">

    <div class="file is-link">
      <label class="file-label">
        <input @input="selectFile" class="file-input" type="file">
        <span class="file-cta">
            <span class="file-icon">
              <icon-renderer :icon="fileIcon"/>
            </span>
            <span v-if="!!value && value.name" class="file-label">
              {{ value.name | translate }}
            </span>
            <span v-else class="file-label">
              {{ buttonText | translate}}
            </span>
          </span>
      </label>
    </div>
    <!--<b-upload :value="value" expanded @input="selectFile">
      <a class="button is-static">
        <icon-renderer :icon="fileIcon" style="margin-right: .75rem"/>
        <span v-if="!!value && value.name">
          {{ value.name }}
        </span>
        <span v-else>

        </span>
      </a>
    </b-upload>-->
    <figure v-if="!!thumbnail" class="file-image image is-128x128">
      <img :src="thumbnail" />
    </figure>
  </div>
</template>
<script>
  /* eslint-disable */
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormFile',
    mixins: [InputMixin],
    props: {
      buttonText: {
        type: String,
        default: 'Choose a file...'
      },
      fileIcon: {
        type: [Object, String],
        default: 'upload'
      },
      fileButtonText: String,
    },
    computed: {
      thumbnail() {
        if (this.type !== 'file') {
          return null;
        }

        if (!!this.value) {
          if (typeof this.value === 'string') {
            return this.value;
          } else {
            return window.URL.createObjectURL(this.value);
          }
        }
      }
    },
    methods: {
      selectFile(val) {
        this.$emit('input', val.target.files[0]);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .upload-container {
    width: 100%;
  }

  figure {
    margin-top: .5rem;
    max-width: 33%;
    img {
      padding: 0.25rem;
      background-color: #fff;
      border: 1px solid #dee2e6;
      border-radius: 0.25rem;
      max-width: 100%;
      height: auto;
    }
  }
</style>

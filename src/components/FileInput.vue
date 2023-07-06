<template>
  <div>
    <input
        name="myFile"
        type="file"
        ref="fileInput"
        style="display: none"
        :multiple="multiple"
        :accept="accept"
        @input="selectFile"
    >
    <span v-if="label" class="caption grey--text pb-3">{{ label }}</span>
    <div
        @drop="dropHandler"
        @dragover="dragOverHandler"
        @dragleave="fileInPlane = false"
        class="d-flex justify-center flex-column mb-2 file-input-drag"
        :class="styleModeFileInputDrag.class"
    >
      <div class="flex-shrink-1 flex-grow-1 d-flex align-self-center justify-center pa-2 mob">
        <v-icon
            large
            :color="styleModeFileInputDrag.color"
        >mdi-cloud-upload-outline</v-icon>
        <p
            class="text-center ma-0 align-self-center ml-4 mr-4"
            :class="disableByPropsAndLoading ? 'grey--text' : null"
            style="width: 200px"
        >{{ fileInPlane ? 'Отпустите файл' : label }}</p>
        <v-btn
            small
            class="align-self-center white--text"
            :color="styleModeFileInputDrag.color"
            @click="$refs.fileInput.click()"
            :loading="sendFileLoading"
            :disabled="disableByPropsAndLoading"
        >Выберите в проводнике</v-btn>
      </div>
      <p class="ma-0 text-center"></p>
    </div>
    <v-messages :value="errorBucket" color="error"/>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref
} from 'vue'
import { byteConverter } from '@/utils/byteConverter'

export default defineComponent({
  name: 'FileInput',
  props: {
    label: {
      type: String,
      default: 'Перетащите файл или'
    },
    rules: {
      type: Array,
      default: () => ([])
    },
    required: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: '.json'
    },
    size: {
      type: Number,
      default: 3
    }
  },
  // inject: ['form'],
  created () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // this.form.register(this)
  },
  setup (props, { emit } : { emit: (name: string, ...args: any[]) => void }) {
    const sendFileLoading = ref(false)
    const disableByPropsAndLoading = computed(() => props.disable || sendFileLoading.value)
    const fileInPlane = ref(false)
    const isTypeFileError = ref(false)
    const filesInfo = ref([])
    const errorBucket = ref<string[]>([])

    const ext = (name: string) => {
      const m = name.match(/\.([^.]+)$/)
      return (m && m[1]) || ''
    }

    const styleModeFileInputDrag = computed(() => {
      if (props.disable || sendFileLoading.value) {
        return {
          class: 'disable',
          color: '#a7a7a7'
        }
      }
      if (fileInPlane.value) {
        return {
          class: 'over',
          color: '#566dc7'
        }
      }
      if (errorBucket.value.length) {
        return {
          class: 'err',
          color: '#ff0000'
        }
      }
      return {
        class: '',
        color: '#3a4a87'
      }
    })

    const validationFilesType = (files: File[]): string[] => {
      const accepts = props.accept.split(',')
      return files
        .filter(
          (file) => !accepts.includes(`.${ext(file?.name || '')}`) || ((file.size / 1024 / 1024) >= props.size)
        )
        .map((file) => `${file.name} / ${byteConverter(file.size, 4)}`)
    }

    const sendFiles = async (event: File[]) => {
      if (!event) return
      const validationRes = validationFilesType([...event])
      isTypeFileError.value = false
      errorBucket.value = []

      if (validationRes.length) {
        isTypeFileError.value = true
        errorBucket.value = [
          `Размер фала до ${props.size}MB`,
          `Возможен формат: ${props.accept.split(',').join(', ')}`,
          'Ошибки в файлах',
          ...validationRes
        ]
        return
      }
      emit('file', { files: event })
    }

    const selectFile = (e: Event) => {
      sendFiles([...(e.target as HTMLInputElement).files || []])
    }

    const dropHandler = (e: DragEvent) => {
      fileInPlane.value = false
      e.preventDefault()
      const { dataTransfer } = e
      if (!dataTransfer) return

      if (e.dataTransfer?.items) {
        sendFiles([...e.dataTransfer?.items || []].filter((item) => item.kind === 'file').map((item) => item.getAsFile()) as File[])
      } else {
        sendFiles([...e.dataTransfer?.files || []])
      }
    }

    const dragOverHandler = (ev: DragEvent) => {
      fileInPlane.value = true
      ev.preventDefault()
    }

    const resetValidation = () => {
      isTypeFileError.value = false
      errorBucket.value = []
    }

    const valid = ref(false)
    const validate = () => {
      if (isTypeFileError.value) {
        errorBucket.value = []
      }
      if (props.required) {
        errorBucket.value = []
        errorBucket.value.push('Поле обязательное для заполнения')
      }
      valid.value = errorBucket.value.length === 0
      return errorBucket.value.length === 0
    }

    const validations = () => errorBucket.value.length === 0

    return {
      sendFileLoading,
      filesInfo,
      sendFiles,
      dragOverHandler,
      dropHandler,
      disableByPropsAndLoading,
      fileInPlane,
      selectFile,
      styleModeFileInputDrag,
      resetValidation,
      validations,
      validate,
      valid,
      errorBucket
    }
  }
})
</script>

<style lang="scss">
.file-input-drag {
  width: 100%;
  border-radius: 10px;
  border: dashed 2px #3A4A87;
  transition: all .1s;
  height: 100%;

  &.over {
    border-color: #566dc7;
  }
  &.live {

  }
  &.disable {
    border-color: #a7a7a7;
  }

  &.err {
    border-color: red;
  }
}

.mob {
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
}

</style>

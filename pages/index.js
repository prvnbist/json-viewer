import React from 'react';
import _ from 'lodash';
import Editor from '@monaco-editor/react';

import * as Icons from '@heroicons/react/solid';

const findType = (value) => {
  if (_.isString(value)) return 'string';
  if (_.isNumber(value)) return 'number';
  if (_.isPlainObject(value)) return 'object';
  if (_.isArray(value)) return 'array';
  return '';
};

export default function IndexPage() {
  const [json, setJson] = React.useState({
    string: 'this is a string',
    number: 123,
    object: {
      one: 'one',
      two: 2,
      nested: {
        three: 3,
        four: 'four',
      },
    },
    array: [
      'this',
      'is',
      'an',
      'array',
      {
        object: {
          five: 'cinco',
        },
      },
    ],
  });

  function handleEditorChange(value, event) {
    setJson(JSON.parse(value));
  }

  function handleEditorDidMount(editor, monaco) {}

  function handleEditorWillMount(monaco) {}

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }
  return (
    <div className="h-full gap-5 grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
      <section className="h-full overflow-hidden rounded-lg">
        <Editor
          height="100%"
          width="100%"
          defaultValue="{}"
          defaultLanguage="json"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          beforeMount={handleEditorWillMount}
          onValidate={handleEditorValidation}
          value={JSON.stringify(json, null, 3)}
        />
      </section>
      <JSONViewer json={json} />
    </div>
  );
}

const JSONViewer = ({ json = {} }) => {
  return (
    <div className="h-full overflow-y-auto space-y-1">
      {_.map(json, (value, key) => (
        <Renderer key={key} field={key} value={value} type={findType(value)} />
      ))}
    </div>
  );
};

const Renderer = ({ field, type, value }) => {
  if (_.isString(value) || _.isNumber(value))
    return <Row field={field} value={value} type={type} />;
  if (_.isPlainObject(value) || _.isArray(value))
    return <ObjectCell field={field} value={value} type={type} />;
  return null;
};

const ObjectCell = ({ field, value, type }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="object__cell">
      <Row
        type={type}
        field={field}
        isOpen={isOpen}
        size={_.size(value)}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className={`ml-6 space-y-1 mt-1 ${isOpen ? 'block' : 'hidden'}`}>
        {_.map(value, (_value, key) => (
          <Renderer
            key={key}
            field={key}
            value={_value}
            type={findType(_value)}
          />
        ))}
      </div>
    </div>
  );
};

const Row = (props) => {
  const {
    type,
    isOpen,
    field = '',
    size = null,
    value = null,
    onClick = null,
  } = props;
  return (
    <div className="bg-white flex items-center h-8 px-2 rounded border border-gray-200">
      <span
        className={`
          flex-shrink-0 inline-block text-white rounded mr-2 text-xs font-medium px-1 
          ${type === 'string' ? 'bg-[#54a483]' : ''} 
          ${type === 'number' ? 'bg-[#3e97d8]' : ''}
          ${['object', 'array'].includes(type) ? 'bg-gray-300' : ''}`}
      >
        {type === 'string' && 'az'}
        {type === 'number' && '12'}
        {type === 'object' && '{ }'}
        {type === 'array' && '[ ]'}
      </span>
      <span
        title={field}
        className="text-sm font-medium truncate flex-shrink-0 inline-block w-[120px] md:w-[180px]"
      >
        {field}
      </span>
      <p
        className="text-sm pl-2 truncate text-gray-400 font-[400]"
        title={value}
      >
        {value}
      </p>
      {['object', 'array'].includes(type) && (
        <aside className="ml-auto flex items-center">
          <span className="text-gray-400">{`{ ${size} }`}</span>
          {size > 0 && (
            <span
              onClick={onClick}
              className="ml-2 cursor-pointer h-5 w-5 flex items-center justify-center mr-[-2px] rounded bg-gray-100"
            >
              {isOpen ? (
                <Icons.ChevronDownIcon className="h-5 w-5 text-gray-700" />
              ) : (
                <Icons.ChevronRightIcon className="h-5 w-5 text-gray-700" />
              )}
            </span>
          )}
        </aside>
      )}
    </div>
  );
};

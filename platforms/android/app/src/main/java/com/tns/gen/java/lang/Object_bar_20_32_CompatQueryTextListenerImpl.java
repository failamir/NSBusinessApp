package com.tns.gen.java.lang;

public class Object_bar_20_32_CompatQueryTextListenerImpl extends java.lang.Object implements com.tns.NativeScriptHashCodeProvider, android.support.v7.widget.SearchView.OnQueryTextListener {
	public Object_bar_20_32_CompatQueryTextListenerImpl(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public boolean onQueryTextChange(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onQueryTextChange", boolean.class, args);
	}

	public boolean onQueryTextSubmit(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onQueryTextSubmit", boolean.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
